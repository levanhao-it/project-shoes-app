package com.huyhao.appshoes.payload.order;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Long addressDeliveryId;
    private String voucherCode;
    private String message;

}
