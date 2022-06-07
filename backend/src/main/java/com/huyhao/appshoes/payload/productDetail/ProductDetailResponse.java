package com.huyhao.appshoes.payload.productDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ProductDetailResponse {
    private Long id;
    private double originalPrice;
    private double salePrice;
    private int quantity;
    private boolean status;
    private String size;
    private String color;

}
