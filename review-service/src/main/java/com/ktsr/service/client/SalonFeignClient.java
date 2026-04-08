package com.ktsr.service.client;


import com.ktsr.DTO.SalonDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "SALON-SERVICE", url = "http://localhost:8082")
public interface SalonFeignClient {

    @GetMapping("/api/salon/getById/{id}")
    public ResponseEntity<SalonDto> getSalon(Long id);

    @GetMapping("/api/salon/owner")
    public ResponseEntity<SalonDto> getSalonByOwnerId(
            @RequestHeader("Authorization") String jwt) throws Exception;
}
