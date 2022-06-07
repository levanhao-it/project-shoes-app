package com.huyhao.appshoes.entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;


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

    @OneToMany(mappedBy = "product")
    private List<ProductDetail> productDetailList;

    private boolean active;
}
