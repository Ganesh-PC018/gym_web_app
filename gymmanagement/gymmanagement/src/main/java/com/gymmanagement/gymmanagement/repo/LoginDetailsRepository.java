package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.LoginDetails;
import com.gymmanagement.gymmanagement.entity.MemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LoginDetailsRepository extends JpaRepository<LoginDetails , Long> {
    LoginDetails findByEmail(String email);
}
