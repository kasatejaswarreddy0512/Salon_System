package com.ktsr.controller;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.NotificationDto;
import com.ktsr.entity.Notification;
import com.ktsr.mapper.NotificationMapper;
import com.ktsr.service.NotificationService;
import com.ktsr.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications/salon-owner")
public class SalonNotificationController {

    private final NotificationService notificationService;
    private final BookingFeignClient bookingFeignClient;


    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<Notification>> getNotificationsBySalonId(@PathVariable Long salonId) {

        List<Notification> notifications = notificationService.getAllNotificationsBySalonId(salonId);

        List<NotificationDto> notificationDtos = notifications.stream()
                .map(notification -> {
                    BookingDTO bookingDTO= null;
                    try {
                        bookingDTO= bookingFeignClient.getBookingById(notification.getBookingId()).getBody();
                    }catch (Exception e){
                        throw new RuntimeException(e.getMessage());
                    }
                    return NotificationMapper.toDto(notification, bookingDTO);
                }).collect(Collectors.toList());
        return ResponseEntity.ok(notifications);
    }

}
