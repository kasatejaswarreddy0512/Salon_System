package com.ktsr.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @RequestMapping
    public String home(){
        return "Salon microservices for Salon Booking System...!";
    }
}
