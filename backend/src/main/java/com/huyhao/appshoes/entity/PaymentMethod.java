package com.huyhao.appshoes.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class PaymentMethod extends BaseEntity{
    private String name;
    private boolean status;
    private double discount;

    @JsonIgnore
    @OneToMany(mappedBy = "paymentMethod")
    private List<Orders> ordersList;
}