package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.productDetail.ProductDetailRequest;
import com.huyhao.appshoes.payload.productDetail.ProductDetailResponse;
import com.huyhao.appshoes.payload.product.ProductRequest;
import com.huyhao.appshoes.payload.product.ProductResponse;
import com.huyhao.appshoes.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {
    public final ProductRepository productRepository;
    public final ProductDetailRepository productDetailRepository;
    public final CategoryRepository categoryRepository;
    public final ColorRepository colorRepository;
    public final SizeRepository sizeRepository;

    public List<ProductResponse> getProductList() {
        List<Product> productList = productRepository.findAllByActiveTrue();

        List<ProductResponse> productResponses = new ArrayList<>();
        for(Product p : productList){
            List<ProductDetail> productDetails = productDetailRepository.getProductDetailListByProductId(p.getId());
            List<ProductDetailResponse> productDetailResponses = productDetails.stream().map(e -> ProductDetailResponse.builder()
                    .id(e.getId())
                    .originalPrice(e.getOriginalPrice())
                    .salePrice(e.getSalePrice())
                    .quantity(e.getQuantity())
                    .status(e.getStatus())
                    .color(e.getColor().getName())
                    .size(e.getSize().getName())
                    .build()).collect(Collectors.toList());

            productResponses.add(ProductResponse.builder()
                    .id(p.getId())
                    .name(p.getName())
                    .description(p.getDescription())
                    .nameCategory(p.getCategory().getName())
                    .productDetailList(productDetailResponses)
                    .build());
        }

        return productResponses;
    }


    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product"));

        List<ProductDetail> productDetails = productDetailRepository.getProductDetailListByProductId(productId);

        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .nameCategory(product.getCategory().getName())
                .productDetailList(productDetails.stream().map(e -> ProductDetailResponse.builder()
                        .id(e.getId())
                        .originalPrice(e.getOriginalPrice())
                        .salePrice(e.getSalePrice())
                        .quantity(e.getQuantity())
                        .status(e.getStatus())
                        .color(e.getColor().getName())
                        .size(e.getSize().getName())
                        .build()).collect(Collectors.toList()))
                .build();

    }

    public void createProduct(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found category from categoryID"));
        try{
            Product product = Product.builder()
                    .name(productRequest.getName())
                    .description(productRequest.getDescription())
                    .category(category)
                    .build();

            productRepository.save(product);
        }catch (Exception e){
            throw new IllegalArgumentException("Cannot create product");
        }

    }

    public void createProductDetail(Long productId, ProductDetailRequest productDetailRequest) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));
        Color color = colorRepository.findById(productDetailRequest.getColorId())
                .orElseThrow(() -> new IllegalArgumentException("Not found color from colorId"));

        Size size = sizeRepository.findById(productDetailRequest.getColorId())
                .orElseThrow(() -> new IllegalArgumentException("Not found size from sizeId"));
        try{
            ProductDetail productDetail = ProductDetail.builder()
                    .originalPrice(productDetailRequest.getOriginalPrice())
                    .salePrice(productDetailRequest.getSalePrice())
                    .quantity(productDetailRequest.getQuantity())
                    .status(productDetailRequest.getStatus())
                    .product(product)
                    .color(color)
                    .size(size)
                    .active(true)
                    .build();

            productDetailRepository.save(productDetail);
        }catch (Exception e){
            throw new IllegalArgumentException("Cannot create product detail");
        }

    }

    public void updateProduct(Long productId, ProductRequest productRequest) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));

        String nameRequest = productRequest.getName();
        if(nameRequest != null && nameRequest.length() > 0 && !nameRequest.equals(product.getName())){
            product.setName(nameRequest);
        }

        String description = productRequest.getDescription();
        if(description != null && description.length() > 0 && !description.equals(product.getDescription())){
            product.setDescription(description);
        }

        Long categoryId = productRequest.getCategoryId();
        if(categoryId != null && categoryId != product.getCategory().getId()){
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found category from categoryId"));
            product.setCategory(category);
        }

        productRepository.save(product);
    }

    public void updateProductDetail(Long productId, Long productDetailId ,ProductDetailRequest productDetailRequest) {
        ProductDetail productDetail = productDetailRepository.findByIdAndActiveTrue(productDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));

        Double originalPrice = productDetailRequest.getOriginalPrice();
        if( originalPrice != null && originalPrice != productDetail.getOriginalPrice()){
                productDetail.setOriginalPrice(originalPrice);
        }

        Double salePrice = productDetailRequest.getSalePrice();
        if( salePrice != null && salePrice != productDetail.getSalePrice()){
            productDetail.setSalePrice(salePrice);
        }

        Integer quantity = productDetailRequest.getQuantity();
        if( quantity != null && quantity != productDetail.getQuantity() && quantity > 0){
            productDetail.setQuantity(quantity);
        }

        Boolean status = productDetail.getStatus();
        if( status != null && status != productDetail.getStatus() ){
            productDetail.setStatus(status);
        }

        Long colorId = productDetailRequest.getColorId();
        if(colorId != null && colorId != productDetail.getColor().getId()){
            Color color = colorRepository.findById(colorId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found color from colorId"));
            productDetail.setColor(color);
        }

        Long sizeId = productDetailRequest.getSizeId();
        if(sizeId != null && sizeId != productDetail.getSize().getId()){
            Size size = sizeRepository.findById(sizeId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found size from sizeId"));
            productDetail.setSize(size);
        }

        productDetailRepository.save(productDetail);
    }

    public void deleteProduct(Long productId) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));

        List<ProductDetail> productDetails = productDetailRepository.findProductDetailListByProductId(productId);
        for(ProductDetail pt : productDetails){
            ProductDetail productDetail = productDetailRepository.findById(pt.getId()).orElse(null);
            productDetail.setActive(false);
            productDetailRepository.save(productDetail);
        }

        product.setActive(false);
        productRepository.save(product);
    }

    public void deleteProductDetail(Long productDetailId) {
        ProductDetail productDetail = productDetailRepository.findByIdAndActiveTrue(productDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));

        productDetail.setActive(false);
        productDetailRepository.save(productDetail);
    }
}
