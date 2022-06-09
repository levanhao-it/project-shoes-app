package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CartRepository extends JpaRepository<Cart, Long> {
    Cart findByUsersId(Long id);

}
