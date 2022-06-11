package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Rate;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.payload.rate.RateRequest;
import com.huyhao.appshoes.payload.rate.RateResponse;
import com.huyhao.appshoes.repositories.ProductRepository;
import com.huyhao.appshoes.repositories.RateRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RateService {
    private final RateRepository rateRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;

    public void addRate(RateRequest request){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Product product=productRepository.findByIdAndActiveTrue(request.getProductId()).orElseThrow(()->new IllegalArgumentException("Not found product from product id"));
        Rate rate= Rate.builder()
                .content(request.getContent())
                .rating(request.getRating())
                .product(product)
                .users(user)
                .build();
        rateRepository.save(rate);
    }

    public void deleteRate(Long rateId){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Rate rate=rateRepository.findByUsersAndId(user,rateId).orElseThrow(()-> new IllegalArgumentException("Not found rate from rateId"));
        rateRepository.delete(rate);

    }

    public List<RateResponse> getAllRate(Long productId){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));
        Product product=productRepository.findByIdAndActiveTrue(productId).orElseThrow(()->new IllegalArgumentException("Not found product from product id"));

        List<Rate> rateList=rateRepository.findAllByProduct(product);
        List<RateResponse> result=new ArrayList<>();
        for (Rate rate:rateList
             ) {
            RateResponse rateResponse=RateResponse.builder()
                    .idRate(rate.getId())
                    .rating(rate.getRating())
                    .content(rate.getContent())
                    .modifyDate(rate.getModifiedDate())
                    .userName(rate.getUsers().getFullName())
                    .build();
            result.add(rateResponse);
        }
        return result;
    }
    public void updateRate(Long rateId,RateRequest request){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Rate rate=rateRepository.findByUsersAndId(user,rateId).orElseThrow(()-> new IllegalArgumentException("Rate not found"));

        String contentRequest = request.getContent();
        if(contentRequest != null && contentRequest.length() > 0 && !contentRequest.equals((rate.getContent()))){
            rate.setContent(contentRequest);
        }

        double ratingRequest = request.getRating();
        if(ratingRequest >= 0 && ratingRequest!=rate.getRating()){
            rate.setRating(ratingRequest);
        }
        rateRepository.save(rate);
    }





}
