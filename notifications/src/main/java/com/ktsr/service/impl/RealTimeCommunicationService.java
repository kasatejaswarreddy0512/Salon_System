package com.ktsr.service.impl;

import com.ktsr.DTO.NotificationDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RealTimeCommunicationService {

    private final SimpMessagingTemplate template;

    public void sendNotification(NotificationDto notificationDto) {
        template.convertAndSend(
                "/notification/user/" + notificationDto.getUserId(),
                notificationDto
        );

        template.convertAndSend(
                "/notification/salon/" + notificationDto.getSalonId(),
                notificationDto
        );
    }
}