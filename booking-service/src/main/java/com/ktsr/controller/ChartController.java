package com.ktsr.controller;

import com.ktsr.DTO.SalonDto;
import com.ktsr.entity.Booking;
import com.ktsr.service.BookingService;
import com.ktsr.service.client.SalonFeignClient;
import com.ktsr.service.impl.BookingChartServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings/chart")
@RequiredArgsConstructor
public class ChartController {

    private final BookingChartServiceImpl  bookingChartService;
    private final BookingService bookingService;
    private final SalonFeignClient salonFeignClient;


    @GetMapping("/earnings")
    public ResponseEntity<List<Map<String, Object>>> getEarningsChartData(
            @RequestHeader("Authorization") String jwt) throws Exception {

        SalonDto salon=salonFeignClient.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings=bookingService.getBookingsBySalonId(salon.getId());

        List<Map<String, Object>> chatData= bookingChartService.generateEarningChartData(bookings);
        return ResponseEntity.ok(chatData);

    }

    @GetMapping("/bookings")
    public ResponseEntity<List<Map<String, Object>>> getBookingsChartData(
            @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDto salon = salonFeignClient.getSalonByOwnerId(jwt).getBody();
        List<Booking> bookings=bookingService.getBookingsBySalonId(salon.getId());

        List<Map<String, Object>> chartData= bookingChartService.generateBookingCountChartData(bookings);
        return ResponseEntity.ok(chartData);
    }



}
