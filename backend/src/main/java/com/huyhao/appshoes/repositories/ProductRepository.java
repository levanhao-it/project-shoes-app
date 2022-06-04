package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}
