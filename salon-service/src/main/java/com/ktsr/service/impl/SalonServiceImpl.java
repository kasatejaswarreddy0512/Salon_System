package com.ktsr.service.impl;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonObject;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Salon;
import com.ktsr.repository.SalonRepository;
import com.ktsr.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SalonServiceImpl implements SalonService {

    private final SalonRepository salonRepository;

    @Override
    public Salon createSalon(SalonDto salon, UserDto user) {
        Salon s = new Salon();
        s.setName(salon.getName());
        s.setEmail(salon.getEmail());
        s.setAddress(salon.getAddress());
        s.setCity(salon.getCity());
        s.setImages(salon.getImages());
        s.setPhoneNumber(salon.getPhoneNumber());
        s.setOpeningTime(salon.getOpeningTime());
        s.setClosingTime(salon.getClosingTime());
        s.setOwnerId(user.getId());

        return salonRepository.save(s);
    }

    @Override
    public List<Salon> getSalons() {
        return salonRepository.findAll();
    }

    @Override
    public Salon getSalon(Long id) {
        return salonRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Salon Not Found"));
    }


//    @Override
//    public Salon updateSalon(SalonDto salon, UserDto user, Long salonId) {
//        Salon existingSalon = salonRepository.findById(salonId).orElseThrow(() -> new RuntimeException("Salon Not Found"));
//          if(!salonDto.getOwnerId().equals(user.getId()){
//              throw new RuntimeException("You don't have permission to access this salon");
//          }
//        if (existingSalon != null) {
//            existingSalon.setName(salon.getName());
//            existingSalon.setEmail(salon.getEmail());
//            existingSalon.setAddress(salon.getAddress());
//            existingSalon.setCity(salon.getCity());
//            existingSalon.setImages(salon.getImages());
//            existingSalon.setPhoneNumber(salon.getPhoneNumber());
//            existingSalon.setOpeningTime(salon.getOpeningTime());
//            existingSalon.setClosingTime(salon.getClosingTime());
//            existingSalon.setOwnerId(user.getId());
//            return salonRepository.save(existingSalon);
//        }
//        throw new RuntimeException("Salon not found");
//    }

    @Override
    public Salon updateSalon(String updateJson, UserDto user, Long salonId) {

        Gson gson = new GsonBuilder().setPrettyPrinting().create();

        Salon existingSalon = salonRepository.findById(salonId)
                .orElseThrow(() -> new RuntimeException("Salon Not Found"));

        try {
            if (!existingSalon.getOwnerId().equals(user.getId())) {
                throw new RuntimeException("You don't have permissions to update this salon");
            }
            JsonObject existingSalonJson = gson.toJsonTree(existingSalon).getAsJsonObject();
            JsonObject updates = gson.fromJson(updateJson, JsonObject.class);
            for (String key : updates.keySet()) {
                existingSalonJson.add(key, updates.get(key));
            }
            Salon updatedSalon = gson.fromJson(existingSalonJson, Salon.class);
            updatedSalon.setOwnerId(user.getId());

            return salonRepository.save(updatedSalon);

        } catch (Exception e) {
            throw new RuntimeException("Invalid JSON input");
        }
    }

    @Override
    public void deleteSalon(Long id) {
        salonRepository.deleteById(id);
    }

    @Override
    public Salon getSalonByOwnerId(Long ownerId) {
        return salonRepository.findByOwnerId(ownerId)
                .orElseThrow(() -> new RuntimeException("Salon not found for owner id: " + ownerId));
    }

    @Override
    public List<Salon> searchSalonByCityName(String keyword) {
        return salonRepository.searchSalon(keyword);
    }
}
