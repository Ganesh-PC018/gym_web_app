package com.gymmanagement.gymmanagement.service;

import com.gymmanagement.gymmanagement.entity.InterestedToJoinMembers;

import java.util.List;

public interface InterestedToJoinMembersService {
    List<InterestedToJoinMembers> allMembers();
    InterestedToJoinMembers addMembers(InterestedToJoinMembers interestedToJoinMembers);
}
