package com.huyhao.appshoes.payload.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class ProductFilterResponse {
    private long totalItems;
    private List<ProductResponse> products;
    private int totalPages;
    private int currentPage;
}
