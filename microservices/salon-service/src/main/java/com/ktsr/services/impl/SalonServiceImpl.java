package com.ktsr.services.impl;

import com.ktsr.dto.SalonDto;
import com.ktsr.dto.UserDto;
import com.ktsr.entity.Salon;
import com.ktsr.repository.SalonRepository;
import com.ktsr.services.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {

    private final SalonRepository salonRepository;


    @Override
    public Salon createSalon(SalonDto salon, UserDto user) {
        return null;
    }

    @Override
    public List<Salon> getSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalonById(Long id) {
        return null;
    }

    @Override
    public Salon getSalonByOwnerId(Long id) {
        return null;
    }

    @Override
    public List<Salon> searchSalonByCity(String city) {
        return List.of();
    }

    @Override
    public Salon updateSalon(SalonDto salonDto, UserDto userDto, Long id) {
        return null;
    }

    @Override
    public void deleteSalon(Salon salon) {

    }
}
