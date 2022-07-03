package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.product.ProductRequest;
import com.huyhao.appshoes.services.ProductService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/admin/products")
@Slf4j
public class ProductAdminController {
    private final ProductService productService;

    @PostMapping()
    public ResponseEntity<?> createProduct(@RequestBody ProductRequest productRequest){
        try {
            productService.createProduct(productRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PostMapping("/{productId}")
    public ResponseEntity<?> createProductDetail(@PathVariable Long productId, @RequestPart(value = "productDetailRequest") String productDetailRequest, @RequestPart(value = "fileImg")MultipartFile fileImg){
        try {
            productService.createProductDetail(productId, fileImg,productDetailRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long productId, @RequestBody ProductRequest productRequest){
        try {
            productService.updateProduct(productId, productRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{productId}/productDetails/{productDetailId}")
    public ResponseEntity<?> updateProductDetail(
            @PathVariable Long productId,
            @PathVariable Long productDetailId,
            @RequestPart(value = "productDetailRequest") String productDetailRequest,
            @RequestPart(value = "fileImg", required = false) MultipartFile fileImg)
    {
        try {
            productService.updateProductDetail(productId, productDetailId,fileImg, productDetailRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long productId){
        try {
            productService.deleteProduct(productId);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{productId}/productDetails/{productDetailId}")
    public ResponseEntity<?> deleteProductDetail(@PathVariable Long productId, @PathVariable Long productDetailId){
        try {
            productService.deleteProductDetail(productId, productDetailId);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

}
