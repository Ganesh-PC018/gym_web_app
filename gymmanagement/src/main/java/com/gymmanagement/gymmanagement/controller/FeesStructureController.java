package com.gymmanagement.gymmanagement.controller;

import com.gymmanagement.gymmanagement.entity.FeesStructure;
import com.gymmanagement.gymmanagement.service.FessStructureService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fees")
@RequiredArgsConstructor
public class FeesStructureController {
    private final FessStructureService fessStructureService;
    @PostMapping
    public FeesStructure updateFees(@RequestBody  FeesStructure fees){
        System.out.println(fees);
        System.out.println(fees.getBasic());
        System.out.println(fees.getPro());
        System.out.println(fees.getElite());
        return fessStructureService.updateFees(fees);
    }

    @GetMapping
    public FeesStructure allFees(){
        return fessStructureService.allFees();
    }
}
