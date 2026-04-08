package com.ktsr.DTO;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class NotificationDto {

    private Long id;

    private String type;
    private String description;
    private boolean isRead=false;

    private Long userId;

    private Long bookingId;

    private Long salonId;

    private LocalDateTime createdAt;

}
