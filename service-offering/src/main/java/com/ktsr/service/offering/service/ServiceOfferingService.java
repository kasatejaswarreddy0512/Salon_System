package com.ktsr.service.offering.service;

import com.ktsr.service.offering.DTO.CategoryDto;
import com.ktsr.service.offering.DTO.SalonDto;
import com.ktsr.service.offering.entity.ServiceOffering;
import jakarta.persistence.SecondaryTable;

import java.util.List;
import java.util.Set;

public interface ServiceOfferingService {

    ServiceOffering createServiceOffering(ServiceOffering serviceOffering,
                                          SalonDto salonDto,
                                          CategoryDto categoryDto);

    Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId);

    Set<ServiceOffering> getAllServiceByIds(Set<Long> ids);

    ServiceOffering updateServiceOffering(Long id, ServiceOffering serviceOffering);

    ServiceOffering getServiceOfferingById(Long id);
//    List<ServiceOffering> getAllServiceOfferings();
//    void  deleteServiceOfferingById(Long id, Long salonId);
}
