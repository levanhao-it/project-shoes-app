package com.huyhao.appshoes.payload.cart;

import com.huyhao.appshoes.entity.CartItem;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CartRequest {
    private Long user_id;
    private List<CartItem> cartItems;

}
