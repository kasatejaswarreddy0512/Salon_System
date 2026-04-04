package com.ktsr.service;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.PaymentLinkResponse;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.PaymentMethod;
import com.ktsr.entity.PaymentOrder;
import com.razorpay.PaymentLink;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;

public interface PaymentService {

    PaymentLinkResponse createOrder(UserDto userDto,
                                    BookingDTO bookingDTO,
                                    PaymentMethod paymentMethod) throws RazorpayException, StripeException;

    PaymentOrder getPaymentOrderById(Long id);

    PaymentOrder getPaymentOrderByPaymentId(String paymentId);

    PaymentLink createRazorPayPaymentLink(UserDto userDto,
                                          Double amount,
                                          Long orderId) throws RazorpayException;

    String createStripePaymentLink(UserDto userDto, Double amount, Long orderId) throws StripeException;

    Boolean processedPayment(PaymentOrder paymentOrder, String paymentId, String paymentLinkId) throws RazorpayException;

}
