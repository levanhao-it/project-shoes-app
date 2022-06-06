package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductService {
    public final ProductRepository productRepository;

    public List<Product> getProductList() {
        List<Product> productList = productRepository.findAll();
        return productList;
    }
}
