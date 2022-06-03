package com.huyhao.appshoes.entity;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
public class Product extends BaseEntity {
    @ManyToOne
    @JoinColumn(name = "category_id")
    private Category category;

}