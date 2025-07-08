package com.gymmanagement.gymmanagement.service.Impl;

import com.gymmanagement.gymmanagement.entity.FeesStructure;
import com.gymmanagement.gymmanagement.repo.FeesStructureRepository;
import com.gymmanagement.gymmanagement.service.FessStructureService;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
@Service
@RequiredArgsConstructor
public class FeesStructureServiceImpl implements FessStructureService {
    private final FeesStructureRepository feesStructureRepository;
    @Override
    public FeesStructure updateFees(FeesStructure feesStructure) {
        feesStructureRepository.deleteAll();
       FeesStructure updatedFees =  feesStructureRepository.save(feesStructure);
       System.out.println(updatedFees);
       return updatedFees;
    }

    @Override
    public FeesStructure allFees() {
        List<FeesStructure> feesStructureList =  feesStructureRepository.findAll();
        if(feesStructureList.size() != 1){
             throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR,"Error");
        }
        return feesStructureList.get(0);
    }
}
