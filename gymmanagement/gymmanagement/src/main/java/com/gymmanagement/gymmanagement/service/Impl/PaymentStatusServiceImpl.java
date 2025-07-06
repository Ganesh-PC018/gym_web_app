package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.PaymentStatus;
import com.gymmanagement.gymmanagement.repo.PaymentStatusRepository;
import com.gymmanagement.gymmanagement.service.PaymentStatusService;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaymentStatusServiceImpl implements PaymentStatusService {

    private final PaymentStatusRepository repository;

    public PaymentStatusServiceImpl(PaymentStatusRepository repository) {
        this.repository = repository;
    }

    @Override
    public PaymentStatus save(PaymentStatus status) {
        return repository.save(status);
    }

    @Override
    public List<PaymentStatus> getByMemberId(String memberId) {
        return repository.findByMemberId(memberId);
    }

    @Override
    public List<PaymentStatus> getAll() {
        return repository.findAll();
    }

    @Override
    public void updatePaymentStatus(PaymentStatus paymentStatus) {
            List<PaymentStatus> existingPayments = repository.findByMemberId(paymentStatus.getMemberId());
            Boolean isAvailable=false;
            for(PaymentStatus paymentStatus1 : existingPayments){
                if(paymentStatus1.getYearMonth().equals(paymentStatus.getYearMonth())){
                    if(paymentStatus1.getStatus().equals("PAID")){
                        paymentStatus.setStatus("NOT PAID");
                    }else{
                        paymentStatus.setStatus("PAID");
                    }
                    repository.delete(paymentStatus1);
                    isAvailable=true;
                    repository.save(paymentStatus);
                    break;
                }
            }
            if(!isAvailable){
                if(paymentStatus.getStatus().equals("PAID")){
                    paymentStatus.setStatus("NOT PAID");
                }else{
                    paymentStatus.setStatus("PAID");
                }
                System.out.println(paymentStatus);
                repository.save(paymentStatus);
            }
    }
}
