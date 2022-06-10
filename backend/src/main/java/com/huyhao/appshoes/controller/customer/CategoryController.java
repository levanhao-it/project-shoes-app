package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.CategoryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/categories")
@RequiredArgsConstructor
@Slf4j
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<?> listCategory(){
        try {
            return ResponseEntity.ok(categoryService.getAllCategoryList());
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }



}
