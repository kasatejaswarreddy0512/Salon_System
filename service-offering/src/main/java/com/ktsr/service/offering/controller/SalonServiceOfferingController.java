package com.ktsr.service.offering.controller;

import com.ktsr.service.offering.DTO.CategoryDto;
import com.ktsr.service.offering.DTO.SalonDto;
import com.ktsr.service.offering.entity.ServiceOffering;
import com.ktsr.service.offering.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;

    @PostMapping
    public ResponseEntity<ServiceOffering> createServiceOffering(
            @RequestBody ServiceOffering serviceOffering){
        SalonDto  salonDto = new SalonDto();
        salonDto.setId(1L);
        CategoryDto  categoryDto = new CategoryDto();
        categoryDto.setId(1L);

        ServiceOffering offering = serviceOfferingService.createServiceOffering(serviceOffering, salonDto, categoryDto);
        return ResponseEntity.ok().body(offering);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateServiceOffering(@PathVariable Long id,
                                                                 @RequestBody ServiceOffering serviceOffering){

        ServiceOffering offering=serviceOfferingService.updateServiceOffering(id,serviceOffering);
        return ResponseEntity.ok().body(offering);
    }


//    5:10
}
