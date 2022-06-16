package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Orders;
import com.huyhao.appshoes.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findAllByUsers(Users user);

    Optional<Orders> findById(Long id);


}
