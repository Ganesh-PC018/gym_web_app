package com.gymmanagement.gymmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.config.Customizer;

@Configuration
public class SecurityConfiguration {

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF for API use
                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/login","/login/check","/admin","/","activity","admin-login","/fees","/interested","members","/api/payments").permitAll() // Allow these endpoints
                                .requestMatchers("/login", "/login/check", "/admin", "/", "/activity", "/admin-login", "/fees", "/interested", "/members", "/api/payments").permitAll()
                                .anyRequest().authenticated() // Require auth elsewhere
                )
                .httpBasic(Customizer.withDefaults()); // Modern way, avoids deprecation

        return http.build();
    }
}
