package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.WishList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WishListRepository extends JpaRepository<WishList, Long> {

    List<WishList> findByUsersIdAndActiveTrue(Long id);

}
