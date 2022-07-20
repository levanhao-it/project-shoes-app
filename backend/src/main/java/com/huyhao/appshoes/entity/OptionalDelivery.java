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
public class OptionalDelivery extends BaseEntity {
    private String name;
    private String description;
    private Boolean active;

    @JsonIgnore
    @OneToMany(mappedBy = "optionDelivery")
    private List<Orders> ordersList;
}
