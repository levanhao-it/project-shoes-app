package com.huyhao.appshoes.payload.order;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class OrderRequest {
    private String email;
    private Long addressDeliveryId;
    private String voucherCode;
    private Long optionalDeliveryId;
    private List<OrderDetailRequest> orderDetailRequestList;
}
