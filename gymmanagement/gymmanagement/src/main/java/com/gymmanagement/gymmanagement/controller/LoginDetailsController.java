package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.LoginDetails;
import com.gymmanagement.gymmanagement.service.LoginDetailsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequiredArgsConstructor
@RequestMapping("/login")
public class LoginDetailsController {
    private  final LoginDetailsService loginDetailsService;
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    @PostMapping("/check")
    @ResponseStatus(HttpStatus.ACCEPTED)
    public LoginDetails login(@RequestBody LoginDetails loginDetails){
        try{
        System.out.println(loginDetails);
        return loginDetailsService.login(loginDetails);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Invalid Credentials");
        }
    }


    @PostMapping
    public ResponseEntity<?> registerUser(@RequestBody LoginDetails user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        System.out.println(user);
        loginDetailsService.registerMemberLogin(user);
        return ResponseEntity.ok("User registered");
    }

//    @GetMapping("/all")
//    public List<LoginDetails> allLoginDetails(){
//        return loginDetailsService.allMembers();
//    }
}
