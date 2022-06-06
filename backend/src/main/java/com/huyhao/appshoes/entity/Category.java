package com.huyhao.appshoes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Category extends BaseEntity {
    private String name;
    private String code;
    private boolean active;
    @OneToMany(mappedBy = "category")
    private List<Product> productList;
}
