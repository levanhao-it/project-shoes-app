package com.huyhao.appshoes.payload.cart;

import com.huyhao.appshoes.entity.ProductDetail;
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
    private List<CartItemResponse> cartItemResponsesList;


}
