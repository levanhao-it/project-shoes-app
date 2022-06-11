package com.huyhao.appshoes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class CartItem extends BaseEntity{
    private int quantity;
    private double price;
    @ManyToOne()
    @JoinColumn(name = "productDetail_id")
    private ProductDetail productDetail;

    @ManyToOne()
    @JoinColumn(name = "cart_id")
    private Cart cart;


}
