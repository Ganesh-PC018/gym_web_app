package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.FeesStructure;
import lombok.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeesStructureRepository extends JpaRepository<FeesStructure, Long> {

}
