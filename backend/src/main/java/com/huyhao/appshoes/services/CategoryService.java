package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Category;
import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.payload.category.CategoryRequest;
import com.huyhao.appshoes.payload.category.CategoryResponse;
import com.huyhao.appshoes.payload.product.ProductResponse;
import com.huyhao.appshoes.repositories.CategoryRepository;
import com.huyhao.appshoes.repositories.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public Category createCategory(CategoryRequest categoryRequest){
        Category existCategory = categoryRepository.findByName(categoryRequest.getName());

        if(existCategory != null){
            throw new IllegalArgumentException("Category already exists");
        }

        Category category = Category.builder()
                .name(categoryRequest.getName())
                .code(categoryRequest.getCode())
                .active(true)
                .build();


        return categoryRepository.save(category);
    }

    public List<CategoryResponse> getAllCategoryList(){
        List<Category> categoryList=categoryRepository.findAll();
        List<CategoryResponse> categoryResponseList=new ArrayList<>();

        for (Category c: categoryList
             ) {
            List<Product> productList=productRepository.findAllByCategory(c);
            List<ProductResponse> productResponses = productList.stream().map(e -> ProductResponse.builder()
                    .id(e.getId())
                    .nameCategory(e.getCategory().getName())
                    .description(e.getDescription())
                    .name(e.getName())
                    .originalPrice(e.getOriginalPrice())
                    .build()).collect(Collectors.toList());
            categoryResponseList.add(CategoryResponse.builder()
                    .id(c.getId())
                    .name(c.getName())
                    .code(c.getCode())
                    .productList(productResponses)
                    .build());

        }
        return categoryResponseList;

    }


}
