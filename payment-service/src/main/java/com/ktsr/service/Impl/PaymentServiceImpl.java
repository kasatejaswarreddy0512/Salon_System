package com.ktsr.service.Impl;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.PaymentLinkResponse;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.PaymentMethod;
import com.ktsr.entity.PaymentOrder;
import com.ktsr.entity.PaymentOrderStaus;
import com.ktsr.messaging.BookingEventProducer;
import com.ktsr.messaging.NotificationEventProducer;
import com.ktsr.repository.PaymentOrderRepository;
import com.ktsr.service.PaymentService;
import com.razorpay.Payment;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import lombok.RequiredArgsConstructor;
import org.json.JSONObject;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final PaymentOrderRepository paymentOrderRepository;
    private final BookingEventProducer bookingEventProducer;

    private final NotificationEventProducer notificationEventProducer;

    @Value("${stripe.api.key}")
    private String stripeSecretKey;

    @Value("${razorpay.api.key}")
    private String razorpayApiKey;

    @Value("${razorpay.api.secret}")
    private String razorpayApiSecret;



    @Override
    public PaymentLinkResponse createOrder(UserDto userDto,
                                           BookingDTO bookingDTO,
                                           PaymentMethod paymentMethod) throws RazorpayException, StripeException {
        Double amount=bookingDTO.getTotalPrices();

        PaymentOrder paymentOrder = new PaymentOrder();
        paymentOrder.setAmount(amount);
        paymentOrder.setBookingId(bookingDTO.getId());
        paymentOrder.setSalonId(bookingDTO.getSalonId());
        paymentOrder.setUserId(userDto.getId());
        paymentOrder.setPaymentMethod(paymentMethod);
        PaymentOrder savedPaymentOrder = paymentOrderRepository.save(paymentOrder);

        PaymentLinkResponse paymentLinkResponse = new PaymentLinkResponse();

        if (paymentMethod.equals(PaymentMethod.RAZORPAY)){
            PaymentLink payment = createRazorPayPaymentLink(
                    userDto,
                    savedPaymentOrder.getAmount(),
                    savedPaymentOrder.getId()
            );

            String paymentUrl = payment.get("short_url").toString();
            String paymentUrlId = payment.get("id").toString();

            paymentLinkResponse.setPayment_link_url(paymentUrl);
            paymentLinkResponse.setPayment_link_id(paymentUrlId);

            savedPaymentOrder.setPaymentLinkId(paymentUrlId);

            paymentOrderRepository.save(savedPaymentOrder);
        }else {
            String paymentUrl=createStripePaymentLink(userDto,
                    savedPaymentOrder.getAmount(),
                    savedPaymentOrder.getId());

            paymentLinkResponse.setPayment_link_url(paymentUrl);
        }
        return paymentLinkResponse;
    }

    @Override
    public PaymentOrder getPaymentOrderById(Long id) {
        PaymentOrder paymentOrder= paymentOrderRepository.findById(id).orElse(null);
        if (paymentOrder == null){
            throw new RuntimeException("Payment Order Not Found");
        }
        return paymentOrder;
    }

    @Override
    public PaymentOrder getPaymentOrderByPaymentId(String paymentId) {
        return paymentOrderRepository.findByPaymentLinkId(paymentId);
    }

    @Override
    public PaymentLink createRazorPayPaymentLink(UserDto userDto,
                                                 Double amount,
                                                 Long orderId) throws RazorpayException {

        long amountPay = Math.round(amount * 100);

        RazorpayClient razorpay = new RazorpayClient(razorpayApiKey, razorpayApiSecret);

        JSONObject request = new JSONObject();
        request.put("amount", amountPay);
        request.put("currency", "INR");

        JSONObject customer = new JSONObject();
        customer.put("name", userDto.getFullName());
        customer.put("email", userDto.getEmail());

        request.put("customer", customer);

        JSONObject notify = new JSONObject();
        notify.put("email", true);
        notify.put("sms", true);

        request.put("notify", notify);

        request.put("reminder_enable", true);

        request.put("callback_url", "http://localhost:3000/payment-success/" + orderId);
        request.put("callback_method", "get");

        try {
            return razorpay.paymentLink.create(request);
        } catch (RazorpayException e) {
            throw new RuntimeException("Failed to create Razorpay payment link", e);
        }
    }


    @Override
    public String createStripePaymentLink(UserDto userDto, Double amount, Long orderId) throws StripeException {

        Stripe.apiKey=stripeSecretKey;

        SessionCreateParams params=SessionCreateParams.builder()
                .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                .setMode(SessionCreateParams.Mode.PAYMENT)
                .setSuccessUrl("http://localhost:3000/payment-sucess/"+orderId)
                .setCancelUrl("http://localhost:3000/payment-cancel")
                .addLineItem(SessionCreateParams.LineItem.builder()
                        .setQuantity(1L)
                        .setPriceData(SessionCreateParams.LineItem.PriceData.builder()
                                .setCurrency("USD")
                                .setUnitAmount((long) (amount*100))
                                .setProductData(SessionCreateParams.
                                        LineItem.
                                        PriceData.
                                        ProductData.
                                        builder().setName("Salon appointment booking").build()
                                ).build()
                        ).build()
                ).build();

        Session session=Session.create(params);

        return session.getUrl();
    }


    @Override
    public Boolean processedPayment(PaymentOrder paymentOrder,
                                    String paymentId,
                                    String paymentLinkId) throws RazorpayException {

        if (paymentOrder.getStatus().equals(PaymentOrderStaus.PENDING)) {

            if (paymentOrder.getPaymentMethod().equals(PaymentMethod.RAZORPAY)) {

                RazorpayClient razorPay =
                        new RazorpayClient(razorpayApiKey, razorpayApiSecret);

                Payment payment = razorPay.payments.fetch(paymentId);

                Integer amount = payment.get("amount"); // amount in paise
                Double amountInRupees = amount / 100.0;

                String status = payment.get("status");

                if ("captured".equals(status)) {

                    bookingEventProducer.sentBookingUpdateEvent(paymentOrder);

                    notificationEventProducer.sendNotification(
                            paymentOrder.getBookingId(),
                            paymentOrder.getUserId(),
                            paymentOrder.getSalonId()
                    );

                    paymentOrder.setStatus(PaymentOrderStaus.SUCCESS);
                    paymentOrderRepository.save(paymentOrder);

                    return true;
                }

                return false;

            } else {

                paymentOrder.setStatus(PaymentOrderStaus.SUCCESS);
                paymentOrderRepository.save(paymentOrder);

                return true;
            }
        }

        return false;
    }
}
