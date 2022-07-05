package com.huyhao.appshoes.payload.auth;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistrationRequest {
    private String password;
    private String fullName;
    private String email;
}
