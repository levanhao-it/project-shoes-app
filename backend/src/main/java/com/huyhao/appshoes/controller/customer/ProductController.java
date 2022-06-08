package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.productDetail.ProductDetailRequest;
import com.huyhao.appshoes.payload.product.ProductRequest;
import com.huyhao.appshoes.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/products")
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping()
    public ResponseEntity<?> getProductList(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(productService.getProductList()));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @GetMapping("/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId){
        try {
            return ResponseEntity.ok(ResponseCommon.success(productService.getProductById(productId)));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }



}
