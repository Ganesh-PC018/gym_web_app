package com.gymmanagement.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Entity
@Table(name = "tbl_member_details")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String memberId;
    private String name;
    private String contact;
    private String email;
    private String plan;
    private String joiningDate;
    private String status;
}
