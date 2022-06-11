package com.huyhao.appshoes.payload.cart;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CartResponse {

    private Long id;
    private int quantity;
    private double price;
    private List<CartItemResponse> cartItemResponsesList;



}
