package com.huyhao.appshoes.entity;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@Builder
public class Cart extends BaseEntity{

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "users_id", referencedColumnName = "id")
    private Users users;

    @OneToMany(mappedBy = "cart")
    private List<CartItem> cartItemList;

    public Cart(Users user,List<CartItem> cartItemList) {
        this.users=user;
        this.cartItemList=cartItemList;
    }


}
