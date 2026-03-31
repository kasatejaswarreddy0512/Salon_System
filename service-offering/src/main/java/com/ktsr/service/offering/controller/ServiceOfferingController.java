package com.ktsr.service.offering.controller;


import com.ktsr.service.offering.entity.ServiceOffering;
import com.ktsr.service.offering.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/service-offering")
@RequiredArgsConstructor
public class ServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    @GetMapping("/{id}")
    public ResponseEntity<ServiceOffering> getServiceOfferingById(@PathVariable Long id){
        ServiceOffering serviceOffering = serviceOfferingService.getServiceOfferingById(id);
        return ResponseEntity.ok().body(serviceOffering);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<Set<ServiceOffering>> getServicesBySalonId(
            @PathVariable Long salonId,
            @RequestParam(required = false) Long categoryId){
        Set<ServiceOffering> serviceOfferings=serviceOfferingService.getAllServiceBySalonId(salonId,categoryId);
        return ResponseEntity.ok(serviceOfferings);
    }

    @GetMapping("/list/{ids}")
    public ResponseEntity<Set<ServiceOffering>> getServicesBySalonIds(
            @PathVariable Set<Long> ids){
        Set<ServiceOffering> serviceOfferings=serviceOfferingService.getAllServiceByIds(ids);
        return ResponseEntity.ok(serviceOfferings);
    }



}
