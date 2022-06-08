package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.CartItem;
import com.huyhao.appshoes.payload.cart.CartItemResponse;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItemResponse> findAllByCartId(Long id);
}
