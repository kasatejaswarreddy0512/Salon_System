package com.ktsr.DTO;


import com.ktsr.entity.BookingStatus;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Data
public class BookingDTO {

    private Long id;

    private Long salonId;

    private Long customerId;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Set<Long> serviceIds;
    private BookingStatus status= BookingStatus.PENDING;
    private double totalPrices;

    private Set<ServiceDTO> services;

    private UserDto user;

    private SalonDto salon;

}
