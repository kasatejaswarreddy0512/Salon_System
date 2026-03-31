package com.ktsr.service.offering.repository;

import com.ktsr.service.offering.DTO.CategoryDto;
import com.ktsr.service.offering.DTO.SalonDto;
import com.ktsr.service.offering.entity.ServiceOffering;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.Set;

public interface ServiceOfferingRepository extends JpaRepository<ServiceOffering,Long> {

    Set<ServiceOffering> findBySalonId(Long salonId);

}
