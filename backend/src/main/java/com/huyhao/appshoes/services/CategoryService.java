package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Category;
import com.huyhao.appshoes.payload.category.CategoryRequest;
import com.huyhao.appshoes.repositories.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;

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

    public List<Category> getAllCategoryList(){
        return categoryRepository.findAll();
    }

    public boolean findById(Long categoryId) {
        return categoryRepository.findById(categoryId).isPresent();
    }
}