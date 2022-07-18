package com.huyhao.appshoes.payload.order;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class OrderDetailRequest {
    private Long productDetailId;
    private Integer quantity;
}
