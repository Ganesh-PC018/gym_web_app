package com.gymmanagement.gymmanagement.io;

import lombok.Data;

@Data
public class LoginDetailsRequest {
    private String email;
    private String password;
}
