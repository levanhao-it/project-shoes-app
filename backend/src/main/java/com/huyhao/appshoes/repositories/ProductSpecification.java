package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.*;
import org.springframework.data.jpa.domain.Specification;

import javax.persistence.criteria.*;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification {
    private ProductSpecification(){}
    @SuppressWarnings("serial")
    public static Specification<Product> filterBy(String title, Long categoryId, Integer price_gte, Integer price_lte,String color,String size){
        return new Specification<Product>() {
            @Override
            public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
                List<Predicate> predicateList=new ArrayList<>();

                query.distinct(true);
                if(title!=null && !title.isEmpty()){
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.like(root.get("name"),"%"+title+"%")));
                }

                if (categoryId != null){
                    Join<Product, Category> joinSize=root.join("category");
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.equal(joinSize.get("id"),categoryId)));
                }

                if (price_gte != null && price_gte >= 0) {
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.greaterThanOrEqualTo(root.get("originalPrice"), price_gte)));
                }
                if (price_lte!=null && price_lte >= 0) {
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.lessThanOrEqualTo(root.get("originalPrice"), price_lte)));
                }
                if(color!=null&&!color.isEmpty()){
                    Join<Product, ProductDetail> joinSize=root.join("productDetailList");
                    Join<ProductDetail, Color> join1=joinSize.join("color");
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.like(join1.get("name"),"%"+color+"%")));
                }
                if(size!=null&&!size.isEmpty()){
                    Join<Product, ProductDetail> joinSize=root.join("productDetailList");
                    Join<ProductDetail, Size> join1=joinSize.join("size");
                    predicateList.add(criteriaBuilder.and(criteriaBuilder.like(join1.get("name"),"%"+size+"%")));
                }
                return criteriaBuilder.and(predicateList.toArray(new Predicate[predicateList.size()]));
            }
        };
    }
}
