package com.huyhao.appshoes.payload.cart;

import com.huyhao.appshoes.entity.ProductDetail;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartItemRequest {
    private Long id;
    private Integer quantity;
    private ProductDetail productDetail;
}
