package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.io.MemberDetailsRequest;
import com.gymmanagement.gymmanagement.io.MemberDetailsResponse;
import com.gymmanagement.gymmanagement.repo.MemberDetailsRepository;
import com.gymmanagement.gymmanagement.service.MemberDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/members")
@CrossOrigin("*")
@RequiredArgsConstructor
public class MemberDetailsController {

    private final MemberDetailsService memberDetailsService;
    private final MemberDetailsRepository memberDetailsRepository;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public MemberDetailsResponse addMember(@RequestBody MemberDetailsRequest request){
        return memberDetailsService.addMember(request);
    }

    @GetMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public List<MemberDetailsResponse> allMembers(){
        return memberDetailsService.allMembers();
    }


    @DeleteMapping("/{memberId}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteMember(@PathVariable String memberId) {
        try {
            memberDetailsService.deleteMember(memberId);
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Error while deleting");
        }
    }

    @PutMapping
    @ResponseStatus(HttpStatus.ACCEPTED)
    public void updateMember(@RequestBody MemberDetails memberDetails){
        try{
            memberDetailsService.updateUserDetails(memberDetails);
        }catch(Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error While Updating.");
        }
    }
}
