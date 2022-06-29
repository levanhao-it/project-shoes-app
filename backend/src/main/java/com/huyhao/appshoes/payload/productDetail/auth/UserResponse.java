package com.huyhao.appshoes.payload.productDetail.auth;

import com.huyhao.appshoes.payload.order.OrderResponse;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Builder
@Getter
@Setter
public class UserResponse {
    private Long idUser;
    private String full_name;
    private String email;
    private String create_by;
    private Date modify_date;
    private String password;
    private int quantityOrders;
    private List<OrderResponse> orderResponseList;
}
