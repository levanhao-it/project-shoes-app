package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Cart;
import com.huyhao.appshoes.entity.CartItem;
import com.huyhao.appshoes.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Long> {

    List<CartItem> findAllByCartId(Long id);
    CartItem findByCartAndProductDetail(Cart cart, ProductDetail productDetail);
}
