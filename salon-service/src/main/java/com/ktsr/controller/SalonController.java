package com.ktsr.controller;

import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Salon;
import com.ktsr.service.SalonService;
import com.ktsr.service.client.UserFeignClient;
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
    private final UserFeignClient userFeignClient;

    @PostMapping
    public ResponseEntity<Salon> createSalon(@RequestBody SalonDto salon,
                                             @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto userDto =userFeignClient.getUserProfile(jwt).getBody();

        Salon created=salonService.createSalon(salon,userDto);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<Salon>> getSalons() {
        return new ResponseEntity<>(salonService.getSalons(), HttpStatus.OK);
    }

    @GetMapping("/getById/{id}")
    public ResponseEntity<Salon> getSalon(@PathVariable Long id) {
        return new ResponseEntity<>(salonService.getSalon(id), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Salon> updateSalon(
            @PathVariable Long id,
            @RequestBody SalonDto salonDto,
            @RequestHeader("Authorization") String jwt) throws Exception {

        UserDto userDto = userFeignClient.getUserProfile(jwt).getBody();

        Salon updatedSalon = salonService.updateSalon(salonDto, userDto, id);
        return ResponseEntity.ok(updatedSalon);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSalon(Long id) {
        salonService.deleteSalon(id);
        return new ResponseEntity<>("Salon Deleted Successfully..!👌", HttpStatus.OK);
    }

    @GetMapping("/owner")
    public ResponseEntity<Salon> getSalonByOwnerId(
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto=userFeignClient.getUserProfile(jwt).getBody();
        if(userDto==null){
            throw new Exception("User not found from jwt...!");
        }
        return new ResponseEntity<>(salonService.getSalonByOwnerId(userDto.getId()), HttpStatus.OK);
    }


    @GetMapping("/search/{keyword}")
    public ResponseEntity<List<Salon>> searchSalonByKeyword(@PathVariable String keyword) {
        return new ResponseEntity<>(salonService.searchSalonByCityName(keyword), HttpStatus.OK);
    }

}
