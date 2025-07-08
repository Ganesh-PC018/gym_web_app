package com.gymmanagement.gymmanagement.service;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.io.MemberDetailsRequest;
import com.gymmanagement.gymmanagement.io.MemberDetailsResponse;

import java.util.List;
import java.util.Optional;

public interface MemberDetailsService {
    MemberDetailsResponse addMember(MemberDetailsRequest request);
    List<MemberDetailsResponse> allMembers();
    void deleteMember(String memberId);
    void updateUserDetails(MemberDetails memberDetails);

}
