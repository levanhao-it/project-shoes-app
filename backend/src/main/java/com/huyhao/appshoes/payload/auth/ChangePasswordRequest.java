package com.huyhao.appshoes.payload.auth;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ChangePasswordRequest {
    private String newPassword;
    private String verificationCode;
}
