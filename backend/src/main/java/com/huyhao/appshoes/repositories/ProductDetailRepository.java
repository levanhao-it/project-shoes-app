package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.ProductDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductDetailRepository extends JpaRepository<ProductDetail, Long> {
    @Query(value = "select pt.* from  product_detail pt join product p on pt.product_id =  p.id where p.id = :productId and pt.active = true", nativeQuery = true)
    List<ProductDetail> getProductDetailListByProductId(@Param("productId") Long productId);

    Optional<ProductDetail> findByIdAndActiveTrue(Long productDetailId);

    @Query(value = "select * from  product_detail pt where pt.product_id = :productId and pt.active = true", nativeQuery = true)
    List<ProductDetail> findProductDetailListByProductId(@Param("productId") Long productId);

    Optional<ProductDetail> findById(Long id);


}
