package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Category;
import com.huyhao.appshoes.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> , PagingAndSortingRepository<Product, Long>, JpaSpecificationExecutor<Product> {
    List<Product> findAllByActiveTrue();

    Optional<Product> findByIdAndActiveTrue(Long productId);

    List<Product> findAllByActiveTrueAndCategory(Category c);

    Page<Product> findAllByActiveTrue(Specification<Product> spec,  Pageable pageable);

    Page<Product> findByCategoryIdAndActiveTrue(long id, Pageable pageable);

    Page<Product> findByActiveTrueAndNameContaining(String title, Pageable pageable);
}
