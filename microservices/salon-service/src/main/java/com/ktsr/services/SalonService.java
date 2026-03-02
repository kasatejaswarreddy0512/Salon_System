package com.ktsr.services;

import com.ktsr.dto.SalonDto;
import com.ktsr.dto.UserDto;
import com.ktsr.entity.Salon;

import java.util.List;

public interface SalonService {

    Salon createSalon(SalonDto salon, UserDto user);
    List<Salon> getSalons();
    Salon getSalonById(Long id);
    Salon getSalonByOwnerId(Long id);
    List<Salon> searchSalonByCity(String city);
    Salon updateSalon(SalonDto salonDto, UserDto userDto, Long id);
    void deleteSalon(Salon salon);
}
