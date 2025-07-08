package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.PreviousMembers;
import com.gymmanagement.gymmanagement.service.PreviousMembersService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/previous-members")
//@CrossOrigin("*")
public class PreviousMembersController {
    private final PreviousMembersService previousMembersService;
    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<PreviousMembers> allPreviousMembers(){
        try{
        return previousMembersService.allMembers();
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"No Member Found.");
        }
    }
}
