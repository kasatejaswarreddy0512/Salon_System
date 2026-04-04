package com.ktsr.service.Impl;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.PaymentLinkResponse;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.PaymentMethod;
import com.ktsr.entity.PaymentOrder;
import com.ktsr.service.PaymentService;
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

    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createPaymentLink(@RequestBody BookingDTO bookingDTO,
                                                                 @RequestParam PaymentMethod paymentMethod) throws StripeException, RazorpayException {

        UserDto userDto = new UserDto();
        userDto.setId(1L);
        userDto.setFullName("Tejaswar Reddy");
        userDto.setEmail("teja@gmail.com");

        PaymentLinkResponse response=paymentService.createOrder(userDto,bookingDTO,paymentMethod);

        return new ResponseEntity<>(response, HttpStatus.OK);

    }

    @GetMapping("/{paymentOrderId")
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
