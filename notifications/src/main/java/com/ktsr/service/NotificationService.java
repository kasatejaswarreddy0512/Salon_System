package com.ktsr.service;

import com.ktsr.DTO.NotificationDto;
import com.ktsr.entity.Notification;

import java.util.List;

public interface NotificationService {

    NotificationDto createNotification(Notification notification);
    List<Notification> getNotificationsByUserId(Long userId);

    List<Notification> getAllNotificationsBySalonId(Long salonId);
    Notification markNotificationAsRead(Long notificationId);

}
