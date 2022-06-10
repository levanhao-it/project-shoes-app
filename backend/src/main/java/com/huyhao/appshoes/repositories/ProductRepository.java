package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Category;
import com.huyhao.appshoes.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findAllByActiveTrue();

    Optional<Product> findByIdAndActiveTrue(Long productId);

    List<Product> findAllByCategory(Category c);
}
