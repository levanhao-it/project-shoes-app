package com.huyhao.appshoes.payload.voucher;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VoucherRequest {
    private String name;
    private String code;
    private Double priceCondition;
    private Double discount;
    private Integer quantity;
    private Boolean status;
}
