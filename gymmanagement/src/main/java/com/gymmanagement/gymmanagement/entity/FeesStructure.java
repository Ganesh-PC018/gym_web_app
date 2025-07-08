package com.gymmanagement.gymmanagement.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "tbl_fees_structure")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FeesStructure {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private Integer basic;
    private Integer pro;
    private Integer elite;
}

