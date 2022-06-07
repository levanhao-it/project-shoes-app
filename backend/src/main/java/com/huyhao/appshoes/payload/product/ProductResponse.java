package com.huyhao.appshoes.payload.product;

import com.huyhao.appshoes.payload.productDetail.ProductDetailResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String name;
    private String description;
    private String nameCategory;
    private List<ProductDetailResponse> productDetailList;
}
