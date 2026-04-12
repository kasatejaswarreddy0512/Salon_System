package com.ktsr.service;

import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Salon;

import java.util.List;

public interface SalonService {

    Salon createSalon(SalonDto salon, UserDto user);
    List<Salon> getSalons();
    Salon getSalon(Long id);
    // Updated method to accept Gson JSON input
    Salon updateSalon(SalonDto salonDto, UserDto user, Long salonId);
    void deleteSalon(Long id);
    Salon getSalonByOwnerId(Long ownerId);
//    Salon getSalonByName(String name);

    List<Salon> searchSalonByCityName(String keyword);











}
