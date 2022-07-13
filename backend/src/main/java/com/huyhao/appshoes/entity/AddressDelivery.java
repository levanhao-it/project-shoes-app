package com.huyhao.appshoes.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class AddressDelivery extends BaseEntity{
    private String fullName;
    private String address;
    private String phoneNumber;
    private boolean defaultAddress;
    private boolean active;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "users_id", nullable = false)
    private Users users;

    @JsonIgnore
    @OneToMany(mappedBy = "addressDelivery")
    private List<Orders> ordersList;

}
