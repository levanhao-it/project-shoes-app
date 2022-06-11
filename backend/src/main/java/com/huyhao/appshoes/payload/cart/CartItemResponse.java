package com.huyhao.appshoes.payload.cart;

import com.huyhao.appshoes.entity.Color;
import com.huyhao.appshoes.entity.Size;
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
    private String name;
    private Double originalPrice;
    private Double salePrice;
    private Color color;
    private Size size;
    private Integer quantity;



}
