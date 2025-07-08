package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.entity.PreviousMembers;
import com.gymmanagement.gymmanagement.repo.PaymentStatusRepository;
import com.gymmanagement.gymmanagement.repo.PreviousMembersRepository;
import com.gymmanagement.gymmanagement.service.PreviousMembersService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@Builder
@RequiredArgsConstructor
public class PreviousMemberServiceImpl implements PreviousMembersService {
    private final PreviousMembersRepository previousMembersRepository;
    private final PaymentStatusRepository paymentStatusRepository;
    @Override
    public List<PreviousMembers> allMembers() {
        return previousMembersRepository.findAll();
    }

    @Override
    public PreviousMembers addPreviousMember(MemberDetails member) {
        PreviousMembers previousMember = PreviousMembers.builder()
                .memberId(member.getMemberId())
                .name(member.getName())
                .contact(member.getContact())
                .email(member.getEmail())
                .plan(member.getPlan())
                .joiningDate(member.getJoiningDate())
                .unpaidPaymentList(paymentStatusRepository.findUnpaidByMemberId(member.getMemberId()))
                .build();

        previousMembersRepository.save(previousMember);
        return previousMember;
    }

}
