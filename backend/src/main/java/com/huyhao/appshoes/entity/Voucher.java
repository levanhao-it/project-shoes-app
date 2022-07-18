package com.huyhao.appshoes.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

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

    private Boolean status;

    private Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "voucher")
    private List<Orders> ordersList;
}
