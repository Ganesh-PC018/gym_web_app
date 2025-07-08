package com.gymmanagement.gymmanagement.service.Impl;
import com.gymmanagement.gymmanagement.entity.LoginDetails;
import com.gymmanagement.gymmanagement.repo.LoginDetailsRepository;
import com.gymmanagement.gymmanagement.service.LoginDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class LoginDetailsServiceImpl implements LoginDetailsService {

    private final LoginDetailsRepository loginDetailsRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Override
    public LoginDetails login(LoginDetails loginDetails) {
        try {
            LoginDetails existingMember = loginDetailsRepository.findByEmail(loginDetails.getEmail()).orElseThrow(()-> new RuntimeException("User Not Found"));
            if (existingMember == null) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Error");
            }
             if(passwordEncoder.matches(loginDetails.getPassword(), existingMember.getPassword())){
                 return existingMember;
             }
        } catch (Exception e) {
            throw new RuntimeException("Login failed", e);
        }
        throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,"Error");
    }

    @Override
    public List<LoginDetails> allMembers() {
        return loginDetailsRepository.findAll();
    }

    @Override
    public LoginDetails registerMemberLogin(LoginDetails loginDetails) {
        return  loginDetailsRepository.save(loginDetails);
    }
}
