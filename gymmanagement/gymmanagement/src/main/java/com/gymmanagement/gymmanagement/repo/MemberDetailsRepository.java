package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Member;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface MemberDetailsRepository extends JpaRepository<MemberDetails,Long> {
    Optional<MemberDetails> findByMemberId(String memberId);

    @Query(value = """
    SELECT m.*
    FROM tbl_member_details m
    LEFT JOIN tbl_member_payment_status p
      ON m.member_id = p.member_id AND p.year_month = DATE_FORMAT(CURRENT_DATE(), '%Y-%m')
    WHERE (p.status IS NULL OR p.status != 'PAID')
      AND m.joining_date <= CURDATE() - INTERVAL 30 DAY
    """, nativeQuery = true)
    List<MemberDetails> findUnpaidMembers();

}
