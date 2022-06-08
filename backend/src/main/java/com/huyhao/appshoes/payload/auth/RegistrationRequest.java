package com.huyhao.appshoes.payload.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class RegistrationRequest {
    private String password;
    private String fullName;
    private String email;
    private String role_id;
}
