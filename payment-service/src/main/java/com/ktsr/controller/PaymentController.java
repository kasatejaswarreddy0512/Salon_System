package com.ktsr.controller;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.PaymentLinkResponse;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.PaymentMethod;
import com.ktsr.entity.PaymentOrder;
import com.ktsr.service.PaymentService;
import com.ktsr.service.client.UserFeignClient;
import com.razorpay.RazorpayException;
import com.stripe.exception.StripeException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/payments")
public class PaymentController {

    private final PaymentService paymentService;
    private final UserFeignClient userFeignClient;

    @PostMapping("/create")
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@RequestBody BookingDTO bookingDTO,
                                                                 @RequestParam PaymentMethod paymentMethod,
                                                                 @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto userDto = userFeignClient.getUserProfile(jwt).getBody();

        PaymentLinkResponse response = paymentService.createOrder(userDto,bookingDTO,paymentMethod);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/{paymentOrderId}")
    public ResponseEntity<PaymentOrder> getPaymentOrderById(@PathVariable Long paymentOrderId){
        PaymentOrder paymentOrder= paymentService.getPaymentOrderById(paymentOrderId);
        return new ResponseEntity<>(paymentOrder, HttpStatus.OK);
    }

    @PatchMapping("/proceed")
    public ResponseEntity<Boolean> proceedPayment(@RequestParam String paymentId,
                                                       @RequestParam  String paymentLinkId) throws RazorpayException {

        PaymentOrder paymentOrder=paymentService.getPaymentOrderByPaymentId(paymentLinkId);

        Boolean res=paymentService.processedPayment(paymentOrder,paymentId,paymentLinkId);
        return ResponseEntity.ok(res);
    }
}
