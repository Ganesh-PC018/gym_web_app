package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.MemberDetails;
import com.gymmanagement.gymmanagement.repo.MemberDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.lang.reflect.Member;
import java.util.List;

@Service
public class FeeReminderService {

    @Autowired
    private MemberDetailsRepository memberRepository;

    @Autowired
    private JavaMailSender mailSender;

    @Scheduled(cron = "0 0 9 * * *") // Every day at 9 AM
//    @Scheduled(fixedRate = 60000) // Every day at 1 minute
    public void sendFeeReminderEmails() {
        List<MemberDetails> unpaidMembers = memberRepository.findUnpaidMembers();

        for (MemberDetails member : unpaidMembers) {
            sendEmail(member.getEmail(), member.getName());
        }
    }

    private void sendEmail(String to, String name) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject("⚠️ Fee Reminder - GYM CRAZE");
        message.setText("Hi " + name + ",\n\n" +
                "Our records show that your gym fee has not been paid in the last 30 days.\n" +
                "Please make the payment to continue enjoying our services.\n\n" +
                "Stay fit,\nTeam GYM CRAZE 💪");

        mailSender.send(message);
    }
}
