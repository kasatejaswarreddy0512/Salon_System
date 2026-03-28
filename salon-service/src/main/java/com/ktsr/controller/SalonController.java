package com.ktsr.controller;

import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Salon;
import com.ktsr.service.SalonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/salon")
public class SalonController {

    private final SalonService salonService;

    @PostMapping
    public ResponseEntity<Salon> createSalon(@RequestBody SalonDto salon) {
        UserDto userDto = new UserDto();
        userDto.setId(1L);
        Salon created=salonService.createSalon(salon,userDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Salon>> getSalons() {
        return new ResponseEntity<>(salonService.getSalons(), HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Salon> getSalon(Long id) {
        return new ResponseEntity<>(salonService.getSalon(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salon> updateSalon(
            @PathVariable Long id,
            @RequestBody String updateJson
            ) {
//        @RequestAttribute UserDto user
        UserDto userDto = new UserDto();
        userDto.setId(1L);

        Salon updatedSalon = salonService.updateSalon(updateJson, userDto, id);
        return ResponseEntity.ok(updatedSalon);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSalon(Long id) {
        salonService.deleteSalon(id);
        return new ResponseEntity<>("Salon Deleted Successfully..!👌", HttpStatus.OK);
    }

    @GetMapping("/ownerId/{ownerId}")
    public ResponseEntity<Salon> getSalonByOwnerId(@PathVariable Long ownerId) {
        return new ResponseEntity<>(salonService.getSalonByOwnerId(ownerId), HttpStatus.OK);
    }


    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Salon>> searchSalonByKeyword(@PathVariable String keyword) {
        return new ResponseEntity<>(salonService.searchSalonByCityName(keyword), HttpStatus.OK);
    }

}
