package com.huyhao.appshoes.payload.cart;

import com.sun.istack.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AddToCartRequest {
    private @NotNull Long productDetailId;
    private @NotNull Integer quantity;
}
