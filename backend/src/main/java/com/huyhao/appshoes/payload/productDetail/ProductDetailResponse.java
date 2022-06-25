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
    private double salePrice;
    private int quantity;
    private boolean status;
    private Long sizeId;
    private String size;
    private Long colorId;
    private String color;

}
