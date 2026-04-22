package com.ktsr.service.client;

import com.ktsr.DTO.BookingDTO;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "BOOKING-SERVICE" , url = "http://localhost:8085")
public interface BookingFeignClient {

    @GetMapping("/api/bookings/{bookingId}")
    public ResponseEntity<BookingDTO> getBookingById(@PathVariable Long bookingId);
}
