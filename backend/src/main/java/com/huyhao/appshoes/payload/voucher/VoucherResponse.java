package com.huyhao.appshoes.payload.voucher;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class VoucherResponse {
    private Long id;
    private String name;
    private String code;
    private Double priceCondition;
    private Double discount;
    private Integer quantity;
    private Boolean status;
}
