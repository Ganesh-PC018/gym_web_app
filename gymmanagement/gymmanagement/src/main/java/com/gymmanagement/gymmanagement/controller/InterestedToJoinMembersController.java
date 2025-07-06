package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.InterestedToJoinMembers;
import com.gymmanagement.gymmanagement.service.InterestedToJoinMembersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/interested")
@RequiredArgsConstructor
@CrossOrigin("*")
public class InterestedToJoinMembersController {
    private final InterestedToJoinMembersService interestedToJoinMembersService;
    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<InterestedToJoinMembers> getAllMembers(){
        try{
            return interestedToJoinMembersService.allMembers();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error While Fetching Members");
        }
    }@PostMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public InterestedToJoinMembers addInterestedMember(@RequestBody InterestedToJoinMembers interestedToJoinMembers){
        try{
            return interestedToJoinMembersService.addMembers(interestedToJoinMembers);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error While Fetching Members");
        }
    }
}
