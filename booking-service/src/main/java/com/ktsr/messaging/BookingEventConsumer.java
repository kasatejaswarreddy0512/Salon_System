package com.ktsr.messaging;

import com.ktsr.entity.Booking;
import com.ktsr.entity.PaymentOrder;
import com.ktsr.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class BookingEventConsumer {

    private final BookingService bookingService;

    @RabbitListener(queues = "booking-queue")
    public void BookingUpdateListener(PaymentOrder paymentOrder){
        bookingService.bookingSuccess(paymentOrder);
    }
}
