package com.ktsr.DTO;

import lombok.Data;

@Data
public class KeycloakUserDto {

    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String username;
}
