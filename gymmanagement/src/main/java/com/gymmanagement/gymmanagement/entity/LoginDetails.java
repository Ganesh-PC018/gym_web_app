package com.gymmanagement.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tbl_login_details")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true)
    private String email;
    private String password;
    private String role;
}
