package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.PreviousMembers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PreviousMembersRepository extends JpaRepository<PreviousMembers,Long> {

}
