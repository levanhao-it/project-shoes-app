package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.ProductDetail;
import com.huyhao.appshoes.repositories.ProductDetailRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProductDetailServices {
    private final ProductDetailRepository productDetailRepository;
    public ProductDetail findById(Long productDetailId) {
        return productDetailRepository.findById(productDetailId).get();
    }
}
