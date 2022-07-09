package com.huyhao.appshoes.payload.auth;

import lombok.*;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateUserRequest {
    private  String oldPassword;
    private String newPassword;
    private String fullName;
    private String email;
}
