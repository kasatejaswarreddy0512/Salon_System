package com.ktsr.DTO;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class ReviewDto {

    private Long id;
    private UserDto user;
    private SalonDto salon;
    private String reviewText;
    private double rating;
    private LocalDateTime createAt;

}
