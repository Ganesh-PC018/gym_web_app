package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.LoginDetails;
import com.gymmanagement.gymmanagement.repo.LoginDetailsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final LoginDetailsRepository loginDetailsRepository;
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginDetails user = loginDetailsRepository.findByEmail(username).orElseThrow(()->new UsernameNotFoundException("User Not found"));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(new SimpleGrantedAuthority(user.getRole()))
        );
    }
}
