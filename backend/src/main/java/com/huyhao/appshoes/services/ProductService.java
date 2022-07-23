package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.product.ProductFilterResponse;
import com.huyhao.appshoes.payload.productDetail.ProductDetailRequest;
import com.huyhao.appshoes.payload.productDetail.ProductDetailResponse;
import com.huyhao.appshoes.payload.product.ProductRequest;
import com.huyhao.appshoes.payload.product.ProductResponse;
import com.huyhao.appshoes.repositories.*;
import com.huyhao.appshoes.utils.AmazonUtil;
import com.huyhao.appshoes.utils.JsonUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
public class ProductService {
    public final ProductRepository productRepository;
    public final ProductDetailRepository productDetailRepository;
    public final CategoryRepository categoryRepository;
    public final ColorRepository colorRepository;
    public final SizeRepository sizeRepository;

    public final RateRepository rateRepository;
    public final AmazonUtil amazonUtil;

    public ProductFilterResponse getProductList(String title, Long categoryId, Integer price_gte, Integer price_lte, int page, int size, String[] sort) {

        List<Order> orders = new ArrayList<>();
        if (sort[0].contains(",")) {
            for (String sortOrder : sort) {
                String[] _sort = sortOrder.split(",");
                orders.add(new Order(getSortDirection(_sort[1]), _sort[0]));
            }
        } else {
            orders.add(new Order(getSortDirection(sort[1]), sort[0]));
        }

        Pageable pageable = PageRequest.of(page - 1, size, Sort.by(orders));
        Page<Product> pageProducts;

//        if (categoryId != 0) {
//            pageProducts = productRepository.findByCategoryIdAndActiveTrue(categoryId, pageable);
//        } else if (title != null) {
//            pageProducts = productRepository.findByActiveTrueAndNameContaining(title, pageable);
//        } else {
//            pageProducts = productRepository.findByActiveTrue(pageable);
//        }
        pageProducts=productRepository.findAll(ProductSpecification.filterBy(title,categoryId,price_gte,price_lte),pageable);

        List<Product> productList = pageProducts.getContent();

        List<ProductResponse> productResponses = new ArrayList<>();
        for (Product p : productList) {
            List<ProductDetail> productDetails = productDetailRepository.getProductDetailListByProductId(p.getId());
            List<ProductDetailResponse> productDetailResponses = productDetails.stream().map(e -> ProductDetailResponse.builder()
                    .id(e.getId())
                    .salePrice(e.getSalePrice())
                    .quantity(e.getQuantity())
                    .status(e.getStatus())
                    .colorId(e.getColor().getId())
                    .color(e.getColor().getName())
                    .sizeId(e.getSize().getId())
                    .size(e.getSize().getName())
                    .linkImg(e.getImageLink())
                    .build()).collect(Collectors.toList());

            productResponses.add(ProductResponse.builder()
                    .id(p.getId())
                    .name(p.getName())
                    .description(p.getDescription())
                    .categoryId(p.getCategory().getId())
                    .categoryName(p.getCategory().getName())
                    .originalPrice(p.getOriginalPrice())
                    .productDetailList(productDetailResponses)
                    .build());
        }

        return ProductFilterResponse.builder()
                .totalItems(pageProducts.getTotalElements())
                .products(productResponses)
                .totalPages(pageProducts.getTotalPages())
                .currentPage(pageProducts.getNumber() + 1)
                .build();
    }

    private Sort.Direction getSortDirection(String s) {
        if (s.equals("desc"))
            return Sort.Direction.DESC;
        return Sort.Direction.ASC;
    }


    public ProductResponse getProductById(Long productId) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product"));

        List<ProductDetail> productDetails = productDetailRepository.getProductDetailListByProductId(productId);

        double ratingAvg = 0;
        double rateCount = 0;
        List<Rate> rateList = rateRepository.findAllByProduct(product);
        for (Rate r : rateList) {
            rateCount += r.getRating();
        }
        if (rateCount > 0) {
            ratingAvg = rateCount / rateList.size();
        }


        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .categoryId(product.getCategory().getId())
                .categoryName(product.getCategory().getName())
                .originalPrice(product.getOriginalPrice())
                .rating(ratingAvg)
                .quantityRate(rateList.size())
                .productDetailList(productDetails.stream().map(e -> ProductDetailResponse.builder()
                        .id(e.getId())
                        .salePrice(e.getSalePrice())
                        .quantity(e.getQuantity())
                        .status(e.getStatus())
                        .colorId(e.getColor().getId())
                        .color(e.getColor().getName())
                        .sizeId(e.getSize().getId())
                        .size(e.getSize().getName())
                        .linkImg(e.getImageLink())
                        .build()).collect(Collectors.toList()))
                .build();

    }

    public void createProduct(ProductRequest productRequest) {
        Category category = categoryRepository.findById(productRequest.getCategoryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found category from categoryID"));
        try {
            Product product = Product.builder()
                    .name(productRequest.getName())
                    .description(productRequest.getDescription())
                    .category(category)
                    .active(true)
                    .originalPrice(productRequest.getOriginalPrice())
                    .build();

            productRepository.save(product);
        } catch (Exception e) {
            throw new IllegalArgumentException("Cannot create product");
        }

    }

    @Transactional
    public void createProductDetail(Long productId, MultipartFile fileImg, String productDetailRequestJson) {
        ProductDetailRequest productDetailRequest = JsonUtil.toObject(productDetailRequestJson, ProductDetailRequest.class);

        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));
        Color color = colorRepository.findById(productDetailRequest.getColorId())
                .orElseThrow(() -> new IllegalArgumentException("Not found color from colorId"));

        Size size = sizeRepository.findById(productDetailRequest.getSizeId())
                .orElseThrow(() -> new IllegalArgumentException("Not found size from sizeId"));
        try {
            ProductDetail productDetail = ProductDetail.builder()
                    .salePrice(productDetailRequest.getSalePrice())
                    .quantity(productDetailRequest.getQuantity())
                    .status(productDetailRequest.getStatus())
                    .product(product)
                    .color(color)
                    .size(size)
                    .imageLink(amazonUtil.uploadFile(fileImg))
                    .active(true)
                    .build();

            productDetailRepository.save(productDetail);
        } catch (Exception e) {
            throw new IllegalArgumentException("Cannot create product detail");
        }

    }

    public void updateProduct(Long productId, ProductRequest productRequest) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));

        String nameRequest = productRequest.getName();
        if (nameRequest != null && nameRequest.length() > 0 && !nameRequest.equals(product.getName())) {
            product.setName(nameRequest);
        }

        String description = productRequest.getDescription();
        if (description != null && description.length() > 0 && !description.equals(product.getDescription())) {
            product.setDescription(description);
        }

        Double originalPrice = productRequest.getOriginalPrice();
        if (originalPrice != null && originalPrice != product.getOriginalPrice()) {
            product.setOriginalPrice(originalPrice);
        }

        Long categoryId = productRequest.getCategoryId();
        if (categoryId != null && categoryId != product.getCategory().getId()) {
            Category category = categoryRepository.findById(categoryId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found category from categoryId"));
            product.setCategory(category);
        }

        productRepository.save(product);
    }

    public void updateProductDetail(Long productId, Long productDetailId, MultipartFile fileImg, String productDetailRequestJson) {
        ProductDetail productDetail = productDetailRepository.findByIdAndActiveTrue(productDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));

        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));

        ProductDetailRequest productDetailRequest = JsonUtil.toObject(productDetailRequestJson, ProductDetailRequest.class);

        Double salePrice = productDetailRequest.getSalePrice();
        if (salePrice != null && salePrice != productDetail.getSalePrice()) {
            productDetail.setSalePrice(salePrice);
        }

        Integer quantity = productDetailRequest.getQuantity();
        if (quantity != null && quantity != productDetail.getQuantity() && quantity > 0) {
            productDetail.setQuantity(quantity);
        }

        Boolean status = productDetailRequest.getStatus();
        productDetail.setStatus(status);

        Long colorId = productDetailRequest.getColorId();
        if (colorId != null && colorId != productDetail.getColor().getId()) {
            Color color = colorRepository.findById(colorId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found color from colorId"));
            productDetail.setColor(color);
        }

        Long sizeId = productDetailRequest.getSizeId();
        if (sizeId != null && sizeId != productDetail.getSize().getId()) {
            Size size = sizeRepository.findById(sizeId)
                    .orElseThrow(() -> new IllegalArgumentException("Not found size from sizeId"));
            productDetail.setSize(size);
        }
        if (fileImg != null) {
            productDetail.setImageLink(amazonUtil.uploadFile(fileImg));
        }


        productDetail.setProduct(product);

        productDetailRepository.save(productDetail);
    }

    public void deleteProduct(Long productId) {
        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from productId"));

        List<ProductDetail> productDetails = productDetailRepository.findProductDetailListByProductId(productId);
        for (ProductDetail pt : productDetails) {
            ProductDetail productDetail = productDetailRepository.findById(pt.getId()).orElse(null);
            productDetail.setActive(false);
            productDetailRepository.save(productDetail);
        }

        product.setActive(false);
        productRepository.save(product);
    }

    public void deleteProductDetail(Long productId, Long productDetailId) {
        ProductDetail productDetail = productDetailRepository.findByIdAndActiveTrue(productDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));

        Product product = productRepository.findByIdAndActiveTrue(productId)
                .orElseThrow(() -> new IllegalArgumentException("Not found product from product id"));

        productDetail.setActive(false);
        productDetailRepository.save(productDetail);
    }
}
