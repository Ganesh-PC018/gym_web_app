package com.gymmanagement.gymmanagement.io;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.NotNull;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberDetailsRequest {
    @NotNull
    private String name;
    @NotNull
    private String contact;
    @NotNull
    private String email;
    @NotNull
    private String plan;
    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private String joiningDate;
    @NotNull
    private String status;
}
