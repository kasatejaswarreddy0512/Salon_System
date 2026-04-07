package com.ktsr.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ServiceDTO {

    private Long id;
    private String name;
    private String description;
    private double price;
    private int duration;
    private String image;
    private Long salonId;
    private Long categoryId;

}
