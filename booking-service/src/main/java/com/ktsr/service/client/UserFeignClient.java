package com.ktsr.service.client;

import com.ktsr.DTO.UserDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(value = "USER-SERVICE", url = "http://localhost:8081")
public interface UserFeignClient {


    @GetMapping("api/users/byId/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id);

    @GetMapping("api/users/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws Exception;


}
