package com.gymmanagement.gymmanagement.service;

import com.gymmanagement.gymmanagement.entity.PaymentStatus;
import java.util.List;

public interface PaymentStatusService {
    PaymentStatus save(PaymentStatus status);
    List<PaymentStatus> getByMemberId(String memberId);
    List<PaymentStatus> getAll();

    void updatePaymentStatus(PaymentStatus paymentStatus);
}
