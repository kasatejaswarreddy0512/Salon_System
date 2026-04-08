package com.ktsr.messaging;

import com.ktsr.DTO.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationEventProducer {

    private final RabbitTemplate rabbitTemplate;

    public void sendNotification(Long bookingId,Long UserId, Long salonId){
        NotificationDto notificationDto=new NotificationDto();
        notificationDto.setBookingId(bookingId);
        notificationDto.setUserId(UserId);
        notificationDto.setSalonId(salonId);
        notificationDto.setDescription("New Booking Got Confirmed");
        notificationDto.setType("BOOKING");

        rabbitTemplate.convertAndSend("notification-queue", notificationDto);

    }
}
