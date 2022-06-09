package com.huyhao.appshoes.payload.wisList;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.payload.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class WishListResponse {
    private Long idWishList;
    private ProductResponse product;
}
