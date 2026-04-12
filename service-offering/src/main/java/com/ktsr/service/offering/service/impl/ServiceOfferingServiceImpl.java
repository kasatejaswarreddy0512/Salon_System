package com.ktsr.service.offering.service.impl;

import com.ktsr.service.offering.DTO.CategoryDto;
import com.ktsr.service.offering.DTO.SalonDto;
import com.ktsr.service.offering.DTO.ServiceDTO;
import com.ktsr.service.offering.entity.ServiceOffering;
import com.ktsr.service.offering.repository.ServiceOfferingRepository;
import com.ktsr.service.offering.service.ServiceOfferingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServiceOfferingServiceImpl implements ServiceOfferingService {

    private final ServiceOfferingRepository serviceOfferingRepository;

    @Override
    public ServiceOffering createServiceOffering(ServiceDTO serviceDTO, SalonDto salonDto, CategoryDto categoryDto) {
        ServiceOffering offering = new ServiceOffering();
        offering.setName(serviceDTO.getName());
        offering.setDescription(serviceDTO.getDescription());
        offering.setSalonId(salonDto.getId());       // safer
        offering.setCategoryId(categoryDto.getId());
        offering.setImage(serviceDTO.getImage());
        offering.setPrice(serviceDTO.getPrice());
        offering.setDuration(serviceDTO.getDuration());

        return serviceOfferingRepository.save(offering);
    }

    @Override
    public Set<ServiceOffering> getAllServiceBySalonId(Long salonId, Long categoryId) {
        Set<ServiceOffering> services= serviceOfferingRepository.findBySalonId(salonId);
        if(categoryId!=null){
            services=services.stream().filter((service)->service.getCategoryId()!= null
            && service.getCategoryId()==categoryId).collect(Collectors.toSet());
        }
        return services;
    }

    @Override
    public Set<ServiceOffering> getAllServiceByIds(Set<Long> ids) {
        List<ServiceOffering> serviceOfferings = serviceOfferingRepository.findAllById(ids);
        return new HashSet<>(serviceOfferings);
    }

    @Override
    public ServiceOffering updateServiceOffering(Long id, ServiceOffering serviceOffering) {
        ServiceOffering serviceOffering1 = serviceOfferingRepository.findById(id).orElse(null);
        if(serviceOffering1 == null){
            throw new RuntimeException("Service Not Found with id "+ id);
        }
        serviceOffering1.setName(serviceOffering.getName());
        serviceOffering1.setDescription(serviceOffering.getDescription());
//        serviceOffering1.setSalonId(serviceOffering.getSalonId());
//        serviceOffering1.setCategoryId(serviceOffering.getCategoryId());
        serviceOffering1.setImage(serviceOffering.getImage());
        serviceOffering1.setPrice(serviceOffering.getPrice());
        serviceOffering1.setDuration(serviceOffering.getDuration());
        return serviceOfferingRepository.save(serviceOffering1);
    }

    @Override
    public ServiceOffering getServiceOfferingById(Long id) {
        ServiceOffering serviceOffering = serviceOfferingRepository.findById(id).orElse(null);
        if(serviceOffering == null){
            throw new RuntimeException("Service Not Found with id "+ id);
        }
        return serviceOffering;

    }
}
