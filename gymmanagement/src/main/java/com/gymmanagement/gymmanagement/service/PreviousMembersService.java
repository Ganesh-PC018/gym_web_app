package com.gymmanagement.gymmanagement.service;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.entity.PreviousMembers;

import java.util.List;

public interface PreviousMembersService {
    List<PreviousMembers> allMembers();
    PreviousMembers addPreviousMember(MemberDetails memberDetails);
}
