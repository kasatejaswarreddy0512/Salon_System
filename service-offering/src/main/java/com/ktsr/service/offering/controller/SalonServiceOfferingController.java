package com.ktsr.service.offering.controller;

import com.ktsr.service.offering.DTO.CategoryDto;
import com.ktsr.service.offering.DTO.SalonDto;
import com.ktsr.service.offering.DTO.ServiceDTO;
import com.ktsr.service.offering.entity.ServiceOffering;
import com.ktsr.service.offering.service.ServiceOfferingService;
import com.ktsr.service.offering.service.client.CategoryFeignClient;
import com.ktsr.service.offering.service.client.SalonFeignClient;
import com.ktsr.service.offering.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/service-offering/salon-owner")
public class SalonServiceOfferingController {

    private final ServiceOfferingService serviceOfferingService;
    private final UserFeignClient  userFeignClient;
    private final SalonFeignClient salonFeignClient;
    private final CategoryFeignClient categoryFeignClient;

    @PostMapping
    public ResponseEntity<ServiceOffering> createServiceOffering(
            @RequestBody ServiceDTO serviceDTO,
            @RequestHeader("Authorization") String jwt) throws Exception {

        SalonDto  salonDto = salonFeignClient.getSalonByOwnerId(jwt).getBody();

        CategoryDto  categoryDto = categoryFeignClient.getCategoryByIdAndSalon(serviceDTO.getId(),
                salonDto.getId()).getBody();

        ServiceOffering offering = serviceOfferingService.createServiceOffering(serviceDTO,
                salonDto, categoryDto);

        return ResponseEntity.ok(offering);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ServiceOffering> updateServiceOffering(@PathVariable Long id,
                                                                 @RequestBody ServiceOffering serviceOffering){

        ServiceOffering offering=serviceOfferingService.updateServiceOffering(id,serviceOffering);
        return ResponseEntity.ok().body(offering);
    }

}
