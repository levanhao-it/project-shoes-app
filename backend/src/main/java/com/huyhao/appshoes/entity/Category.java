package com.huyhao.appshoes.entity;

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
public class Category extends BaseEntity {
    private String name;
    private String code;

    @OneToMany(mappedBy = "category")
    private List<Product> productList = new java.util.ArrayList<>();
}
