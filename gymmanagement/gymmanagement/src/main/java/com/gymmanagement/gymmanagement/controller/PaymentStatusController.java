package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.PaymentStatus;
import com.gymmanagement.gymmanagement.service.PaymentStatusService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin("*")
public class PaymentStatusController {

    private final PaymentStatusService service;

    public PaymentStatusController(PaymentStatusService service) {
        this.service = service;
    }

    @PostMapping
    public PaymentStatus savePayment(@RequestBody PaymentStatus paymentStatus) {
        return service.save(paymentStatus);
    }

    @GetMapping("/{memberId}")
    public List<PaymentStatus> getPaymentStatusByMember(@PathVariable String memberId) {
        return service.getByMemberId(memberId);
    }
    @PutMapping
    public void updatePayment(@RequestBody PaymentStatus paymentStatus){
         service.updatePaymentStatus(paymentStatus);
    }
    @GetMapping
    public List<PaymentStatus> getAllPayments() {
        return service.getAll();
    }
}

