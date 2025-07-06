package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
    List<PaymentStatus> findByMemberId(String memberId);
}
