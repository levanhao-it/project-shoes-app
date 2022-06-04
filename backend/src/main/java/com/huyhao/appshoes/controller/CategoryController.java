package com.huyhao.appshoes.controller;

import com.huyhao.appshoes.payload.CategoryRequest;
import com.huyhao.appshoes.payload.ErrorResponse;
import com.huyhao.appshoes.payload.ResponseObject;
import com.huyhao.appshoes.services.CategoryService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category")
@Slf4j
public class CategoryController {

    @Autowired
    CategoryService categoryService;

    @GetMapping()
    public ResponseEntity<?> listCategory(){
        try {
            return ResponseEntity.ok(categoryService.getAllCategoryList());
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@RequestBody CategoryRequest categoryRequest){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("OK", "Query Create Category Successfully", categoryService.createCategory(categoryRequest)));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseObject("Failed", "Cannot Create", ""));
        }
    }
}
