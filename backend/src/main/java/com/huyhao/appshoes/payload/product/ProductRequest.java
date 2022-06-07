package com.huyhao.appshoes.payload.product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequest {
    private String name;
    private String description;
    private Long categoryId;

}
