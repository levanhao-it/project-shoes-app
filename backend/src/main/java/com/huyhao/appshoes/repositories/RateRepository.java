package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Rate;
import com.huyhao.appshoes.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RateRepository extends JpaRepository<Rate,Long> {
    Optional<Rate> findByUsersAndId(Users users, Long id);
    List<Rate> findAllByUsers(Users users);

    List<Rate> findAllByProduct(Product product);


}
