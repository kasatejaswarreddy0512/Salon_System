package com.ktsr.messaging;


import com.ktsr.entity.PaymentOrder;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

@Component
@RequiredArgsConstructor
public class BookingEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sentBookingUpdateEvent(PaymentOrder paymentOrder) {
        rabbitTemplate.convertAndSend("booking-queue", paymentOrder);
    }

}
