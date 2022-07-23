package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@Slf4j
public class ProductController {
    private final ProductService productService;

    @GetMapping("/public/products")
    public ResponseEntity<?> getProductList(
            @RequestParam(required = false) String title,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "id,asc") String [] sort,
            @RequestParam(required = false) Integer price_gte,
            @RequestParam(required = false) Integer price_lte,
            @RequestParam(required = false) String color,
            @RequestParam(required = false) String size

    ){
        try {
            return ResponseEntity.ok(ResponseCommon.success(
                    productService.getProductList(title, categoryId, price_gte, price_lte,color,size, page, limit, sort)));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @GetMapping("/public/products/{productId}")
    public ResponseEntity<?> getProductById(@PathVariable Long productId){
        try {
            return ResponseEntity.ok(ResponseCommon.success(productService.getProductById(productId)));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }



}
