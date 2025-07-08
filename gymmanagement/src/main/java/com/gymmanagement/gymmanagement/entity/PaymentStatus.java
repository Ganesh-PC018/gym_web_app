package com.gymmanagement.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_member_payment_status")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentStatus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "`member_id`", nullable = false)
    private String memberId;

    @Column(name = "`status`", nullable = false)
    private String status; // Paid, Pending, Overdue

    @Column(name = "`year_month`", nullable = false)
    private String yearMonth; // format: "2025-07"

}

