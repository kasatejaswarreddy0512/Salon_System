package com.ktsr.controller;

import com.ktsr.entity.User;
import com.ktsr.repository.UserRepository;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody User user){
        User u = userService.createUser(user);
        return ResponseEntity.ok(u);
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/byId/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping
    public ResponseEntity<User> updateUser(@RequestBody User user, @RequestParam Long id){
        return ResponseEntity.ok(userService.updateUser(user, id));
    }

    @DeleteMapping
    public ResponseEntity<String> deleteUser(@RequestParam Long id){
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/profile")
    public ResponseEntity<User> getUserProfile(
            @RequestHeader("Authorization") String jwt) throws Exception {
        User user = userService.getUserFromJwt(jwt);
        return ResponseEntity.ok(user);
    }

}
