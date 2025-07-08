package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.PaymentStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PaymentStatusRepository extends JpaRepository<PaymentStatus, Long> {
    List<PaymentStatus> findByMemberId(String memberId);
    @Query(value = "SELECT * FROM tbl_member_payment_status WHERE status != 'PAID' AND member_id = :memberId", nativeQuery = true)
    List<PaymentStatus> findUnpaidByMemberId(@Param("memberId") String memberId);

}
