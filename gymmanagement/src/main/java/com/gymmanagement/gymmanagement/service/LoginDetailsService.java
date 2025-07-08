package com.gymmanagement.gymmanagement.service;

import com.gymmanagement.gymmanagement.entity.LoginDetails;
import com.gymmanagement.gymmanagement.entity.MemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface LoginDetailsService {
    LoginDetails login(LoginDetails loginDetails);
    List<LoginDetails> allMembers();
    LoginDetails registerMemberLogin(LoginDetails loginDetails);
}
