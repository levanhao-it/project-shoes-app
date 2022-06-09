package com.huyhao.appshoes.payload.cart;

import com.huyhao.appshoes.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CartResponse {
    private ProductDetail productDetail;
    private int quantity;

}
