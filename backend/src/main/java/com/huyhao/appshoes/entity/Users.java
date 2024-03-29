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
public class Users extends BaseEntity{
    private String password;
    private String fullName;
    private String email;
    private boolean active;
    private String avatar;
    @Column(name = "verification_code", length = 64)
    private String verificationCode;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<WishList> wishList;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<Rate> rateList;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<Orders> ordersList;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<AddressDelivery> addressDeliveryList;

}
