package com.huyhao.appshoes.payload.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class AuthRequest {
    private String email;
    private String password;
    private final Boolean isRemember;
}
