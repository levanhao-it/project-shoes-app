package com.huyhao.appshoes.payload.category;

import com.huyhao.appshoes.payload.product.ProductResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CategoryResponse {
    private Long id;
    private String name;
    private String code;
    private List<ProductResponse> productList;
}
