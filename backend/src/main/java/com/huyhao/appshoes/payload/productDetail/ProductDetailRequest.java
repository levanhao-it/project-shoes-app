package com.huyhao.appshoes.payload.productDetail;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDetailRequest {
    private Double salePrice;
    private Integer quantity;
    private Boolean status;
    private Long sizeId;
    private Long colorId;
    private String imageLink;

}
