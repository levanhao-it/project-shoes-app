package com.huyhao.appshoes.payload.productDetail;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDetailRequest {
    private Double salePrice;
    private Integer quantity;
    private Boolean status;
    private Long sizeId;
    private Long colorId;


}
