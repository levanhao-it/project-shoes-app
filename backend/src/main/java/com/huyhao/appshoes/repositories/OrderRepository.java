package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Orders;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<Orders, Long> {
    List<Orders> findAllByUsersId(Long userId);

    Optional<Orders> findById(Long id);



    List<Orders> findAll();


}
