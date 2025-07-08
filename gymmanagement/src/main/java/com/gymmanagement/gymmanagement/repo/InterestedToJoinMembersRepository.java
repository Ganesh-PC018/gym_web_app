package com.gymmanagement.gymmanagement.repo;

import com.gymmanagement.gymmanagement.entity.InterestedToJoinMembers;
import com.gymmanagement.gymmanagement.entity.MemberDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface InterestedToJoinMembersRepository extends JpaRepository<InterestedToJoinMembers,Long> {

}
