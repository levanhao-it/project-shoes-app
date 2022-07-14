package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Category;
import com.huyhao.appshoes.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> , PagingAndSortingRepository<Product, Long> {
    List<Product> findAllByActiveTrue();

    Optional<Product> findByIdAndActiveTrue(Long productId);

    List<Product> findAllByCategory(Category c);

    Page<Product> findByActiveTrue(Pageable pageable);

    Page<Product> findByCategoryIdAndActiveTrue(long id, Pageable pageable);

    Page<Product> findByActiveTrueAndNameContaining(String title, Pageable pageable);
}
