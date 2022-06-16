package com.huyhao.appshoes.payload.auth;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Builder
@Getter
@Setter
public class UserResponse {
    private Long idUser;
    private String full_name;
    private String email;
    private String create_by;
    private Date modify_date;
    private int quantityOrders;
}
