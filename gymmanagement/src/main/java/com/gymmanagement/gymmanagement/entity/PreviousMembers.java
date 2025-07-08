package com.gymmanagement.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name =  "tbl_previous_members")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PreviousMembers {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memberId;
    private String name;
    private String contact;
    private String email;
    private String plan;
    private String joiningDate;
//    @OneToMany
    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "previous_member_id")
    private List<PaymentStatus> unpaidPaymentList;
}
