package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Cart;
import com.huyhao.appshoes.entity.CartItem;
import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartRepository extends JpaRepository<Cart, Long> {

}
