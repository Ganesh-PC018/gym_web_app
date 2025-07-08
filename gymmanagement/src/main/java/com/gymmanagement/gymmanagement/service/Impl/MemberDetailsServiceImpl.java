package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.io.MemberDetailsRequest;
import com.gymmanagement.gymmanagement.io.MemberDetailsResponse;
import com.gymmanagement.gymmanagement.io.MemberStatus;
import com.gymmanagement.gymmanagement.repo.MemberDetailsRepository;
import com.gymmanagement.gymmanagement.service.MemberDetailsService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MemberDetailsServiceImpl implements MemberDetailsService {
    private final MemberDetailsRepository memberDetailsRepository;
    @Override
    public MemberDetailsResponse addMember(MemberDetailsRequest request) {
        MemberDetails newMember = convertToEntity(request);
        newMember = memberDetailsRepository.save(newMember);
        return  convertToResponse(newMember);
    }
    private MemberDetailsResponse convertToResponse(MemberDetails memberDetails){
        return MemberDetailsResponse.builder()
                .id(memberDetails.getId())
                .memberId(memberDetails.getMemberId())
                .name(memberDetails.getName())
                .contact(memberDetails.getContact())
                .email(memberDetails.getEmail())
                .joiningDate(memberDetails.getJoiningDate())
                .plan(memberDetails.getPlan())
                .status(memberDetails.getStatus())
                .build();
    }

    private MemberDetails convertToEntity(MemberDetailsRequest request){
        return MemberDetails.builder()
                .memberId(UUID.randomUUID().toString())
                .name(request.getName())
                .contact(request.getContact())
                .email(request.getEmail())
                .plan(request.getPlan())
                .joiningDate(request.getJoiningDate())
                .status(request.getStatus())
                .build();
    }

    @Override
    public List<MemberDetailsResponse> allMembers() {
        return memberDetailsRepository.findAll().stream().map(member->convertToResponse(member)).collect(Collectors.toList());
    }

    @Override
    public void deleteMember(String memberId) {
        MemberDetails existingMember = memberDetailsRepository.findByMemberId(memberId)
                .orElseThrow(() -> new RuntimeException("Could Not Find the MemberId"));

        memberDetailsRepository.delete(existingMember);
    }

    @Override
    public void updateUserDetails(MemberDetails memberDetails) {
        try{

        MemberDetails existingMemberDetails =  memberDetailsRepository.findByMemberId(memberDetails.getMemberId()).orElseThrow(()->new RuntimeException("Could Not Member."));
        memberDetailsRepository.delete(existingMemberDetails);
        memberDetailsRepository.save(memberDetails);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error");
        }
    }
}
