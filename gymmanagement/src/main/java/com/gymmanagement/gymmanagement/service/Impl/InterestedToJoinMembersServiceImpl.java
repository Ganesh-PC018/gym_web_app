package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.InterestedToJoinMembers;
import com.gymmanagement.gymmanagement.repo.InterestedToJoinMembersRepository;
import com.gymmanagement.gymmanagement.service.InterestedToJoinMembersService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@RequiredArgsConstructor
public class InterestedToJoinMembersServiceImpl implements InterestedToJoinMembersService {
    private final InterestedToJoinMembersRepository interestedToJoinMembersRepository;
    @Override
    public List<InterestedToJoinMembers> allMembers() {
        return interestedToJoinMembersRepository.findAll();
    }

    @Override
    public InterestedToJoinMembers addMembers(InterestedToJoinMembers interestedToJoinMembers) {
        try{
           return interestedToJoinMembersRepository.save(interestedToJoinMembers);
        }catch (Exception e){
            throw  new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Could Not Add Interested members");
        }
    }
}
