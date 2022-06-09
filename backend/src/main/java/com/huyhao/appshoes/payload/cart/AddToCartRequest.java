package com.huyhao.appshoes.payload.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddToCartRequest {
    private Long productDetailId;
    private int quantity;
}
