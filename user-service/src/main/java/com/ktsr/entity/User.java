package com.ktsr.entity;

import com.ktsr.DTO.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Name is mandatory")
    private String fullName;

    @NotBlank(message = "username is mandatory")
    private String username;

    @NotBlank(message = "Email is mandatory")
    @Column(unique = true)
    private String email;
    @NotBlank(message = "Password is mandatory")
    private String password;


    @Column(unique = true)
    private String phoneNumber;

    @Column(nullable = false)
    private UserRole role;

    @CreationTimestamp
    private LocalDateTime createdAt;
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}
