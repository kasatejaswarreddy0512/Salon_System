package com.ktsr.mapper;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.NotificationDto;
import com.ktsr.entity.Notification;
import lombok.Data;


public class NotificationMapper {

    public static NotificationDto toDto(Notification notification, BookingDTO bookingDTO) {

        NotificationDto notificationDto = new NotificationDto();
        notificationDto.setId(notification.getId());
        notificationDto.setType(notification.getType());
        notificationDto.setDescription(notification.getDescription());
        notificationDto.setRead(notification.isRead());
        notificationDto.setUserId(notification.getUserId());
        notificationDto.setUserId(notification.getUserId());
        notificationDto.setSalonId(notification.getSalonId());
        notificationDto.setCreatedAt(notification.getCreatedAt());

        return notificationDto;

    }


}
