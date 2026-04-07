package com.ktsr.controller;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.NotificationDto;
import com.ktsr.entity.Notification;
import com.ktsr.mapper.NotificationMapper;
import com.ktsr.service.NotificationService;
import com.ktsr.service.client.BookingFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/notifications")
public class NotificationController {

    private final NotificationService notificationService;
    private final BookingFeignClient bookingFeignClient;

    @PostMapping
    public ResponseEntity<NotificationDto> createNotification(@RequestBody Notification notification) {
        return ResponseEntity.ok(notificationService.createNotification(notification));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Notification>> getNotificationsByUserId(@PathVariable Long userId) {

        List<Notification> notifications = notificationService.getNotificationsByUserId(userId);

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


    @PutMapping("/{notificationId}/read")
    public ResponseEntity<NotificationDto> markNotificationAsRead(@PathVariable Long notificationId) {
        Notification notification=notificationService.markNotificationAsRead(notificationId);

        BookingDTO bookingDTO= bookingFeignClient.getBookingById(notification.getBookingId()).getBody();

        return ResponseEntity.ok(NotificationMapper.toDto(notification,bookingDTO));
    }


}
