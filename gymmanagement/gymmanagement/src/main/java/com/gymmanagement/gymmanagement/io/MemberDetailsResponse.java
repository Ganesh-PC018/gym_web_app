package com.gymmanagement.gymmanagement.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
//import jakarta.validation.constraints.NotNull;
import java.sql.Timestamp;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailsResponse {
    private Long id;
    private String memberId;
    private String name;
    private String contact;
    private String email;
    private String plan;
    private String joiningDate;
    private String status;
}
