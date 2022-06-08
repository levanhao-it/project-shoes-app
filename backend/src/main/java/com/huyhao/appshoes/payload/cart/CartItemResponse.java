package com.huyhao.appshoes.payload.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CartItemResponse {
    private Long id;
    private Integer quantity;
    private Long productDetail_id;
}
