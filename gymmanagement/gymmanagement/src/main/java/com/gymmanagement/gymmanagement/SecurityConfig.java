//package com.gymmanagement.gymmanagement;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.Customizer;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
//import org.springframework.security.web.SecurityFilterChain;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
//
//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .csrf(csrf -> csrf.disable()) // ✅ Correct usage in 6.1+
//                .cors(Customizer.withDefaults()) // enable CORS
//                .authorizeHttpRequests(auth -> auth
//                        .anyRequest().permitAll() // allow all endpoints
//                )
//                .httpBasic(httpBasic -> httpBasic.disable()) // disable basic auth
//                .formLogin(formLogin -> formLogin.disable()); // disable form login
//
//        return http.build();
//    }
//    @Bean
//    public WebMvcConfigurer corsConfigurer() {
//        return new WebMvcConfigurer() {
//            @Override
//            public void addCorsMappings(CorsRegistry registry) {
//                registry.addMapping("/**")
//                        .allowedOrigins("*") // use specific domain in production
//                        .allowedMethods("*");
//            }
//        };
//    }
//
//}
