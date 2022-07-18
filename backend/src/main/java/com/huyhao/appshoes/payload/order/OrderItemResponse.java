package com.huyhao.appshoes.payload.order;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderItemResponse {
    private Long id;
    private String nameProduct;
    private int quantity;
    private double salePrice;
    private String size;
    private String color;
    private String image;

}
