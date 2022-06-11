package com.huyhao.appshoes.payload.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private double feeDelivery;
    private double feeVoucher;
    private int quantityItem;
    private double total;
    private double subtotal;
    List<OrderItemResponse> orderItemResponseList;

}
