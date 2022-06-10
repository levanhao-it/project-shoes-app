package com.huyhao.appshoes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
public class Voucher extends BaseEntity{
    private String name;
    private String code;
    private Double priceConditional;
    private Double discount;
    private Integer quantity;

    private Boolean active;
}
