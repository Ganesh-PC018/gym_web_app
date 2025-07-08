package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.io.LoginDetailsRequest;
import com.gymmanagement.gymmanagement.io.LoginDetailsResponse;
import com.gymmanagement.gymmanagement.service.Impl.CustomUserDetailsService;
import com.gymmanagement.gymmanagement.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/login")
    public ResponseEntity<LoginDetailsResponse> login(@RequestBody LoginDetailsRequest loginRequest) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getEmail(), loginRequest.getPassword()
                )
        );

        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getEmail());
        final String token = jwtUtil.generateToken(userDetails);

        return ResponseEntity.ok(new LoginDetailsResponse(token));
    }
}
