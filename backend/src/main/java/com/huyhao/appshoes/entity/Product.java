package com.huyhao.appshoes.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;



@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Product extends BaseEntity{
    private String name;
    private String description;

    @ManyToOne()
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    private boolean active;
}
