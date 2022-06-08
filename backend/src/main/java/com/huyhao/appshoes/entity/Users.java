package com.huyhao.appshoes.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

import javax.persistence.*;


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

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;


    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<WishList> wishList;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "cart_id", referencedColumnName = "id")
    private Cart cart;

}
