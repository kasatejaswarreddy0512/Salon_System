package com.ktsr.service.impl;


import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.NotificationDto;
import com.ktsr.entity.Notification;
import com.ktsr.mapper.NotificationMapper;
import com.ktsr.repository.NotificationRepository;
import com.ktsr.service.NotificationService;
import com.ktsr.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationService {

    private final NotificationRepository notificationRepository;
    private final BookingFeignClient bookingFeignClient;

    @Override
    public NotificationDto createNotification(Notification notification) {

        Notification savedNotification = notificationRepository.save(notification);

        BookingDTO bookingDTO = bookingFeignClient.getBookingById(savedNotification.getBookingId()).getBody();

        NotificationDto notificationDto = NotificationMapper.toDto(savedNotification, bookingDTO);

        return notificationDto;
    }

    @Override
    public List<Notification> getNotificationsByUserId(Long userId) {
        return notificationRepository.findByUserId(userId);
    }

    @Override
    public List<Notification> getAllNotificationsBySalonId(Long salonId) {
        return notificationRepository.findBySalonId(salonId);
    }

    @Override
    public Notification markNotificationAsRead(Long notificationId) {

        return notificationRepository.findById(notificationId).map(
                notification -> {
                    notification.setRead(true);
                    return notificationRepository.save(notification);
                }
        ).orElseThrow(()-> new RuntimeException("Notification not found"));
    }
}
