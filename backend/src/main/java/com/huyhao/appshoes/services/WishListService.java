package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.entity.WishList;
import com.huyhao.appshoes.payload.wisList.WishListRequest;
import com.huyhao.appshoes.payload.wisList.WishListResponse;
import com.huyhao.appshoes.repositories.ProductRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import com.huyhao.appshoes.repositories.WishListRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.java.Log;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;

    private final ProductRepository productRepository;

    private final ProductService productService;


    public List<WishListResponse> createWishList(WishListRequest wishListRequest) {
        String currentMail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!currentMail.equals(wishListRequest.getEmail())){
            throw new IllegalArgumentException("Email not must be current email");
        }

        Users userApp = userRepository.findByEmail(wishListRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Product product = productRepository.findByIdAndActiveTrue(wishListRequest.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("not found product from productId"));

        WishList wishList = WishList.builder()
                .product(product)
                .users(userApp)
                .active(true)
                .build();

        wishListRepository.save(wishList);
        return getWishList(wishListRequest.getEmail());
    }

    public List<WishListResponse> getWishList(String email) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!email.equals(currentEmail)){
            throw new IllegalArgumentException("Email not must be current email");
        }

        Users userApp = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        List<WishList> wishLists = wishListRepository.findByUsersIdAndActiveTrue(userApp.getId());
        List<WishListResponse> wishListResponses = new ArrayList<>();


        for (WishList wishList : wishLists){
            WishListResponse wishListResponse = WishListResponse.builder()
                    .idWishList(wishList.getId())
                    .product(productService.getProductById(wishList.getProduct().getId()))
                    .build();

            wishListResponses.add(wishListResponse);
        }
        return wishListResponses;
    }


    public List<WishListResponse> deleteWishList(Long wishlistId, String email) {
        WishList wishList = wishListRepository.findById(wishlistId)
                .orElseThrow(() -> new IllegalArgumentException("Not found wishList from wishListId"));

        wishList.setActive(false);
        wishListRepository.save(wishList);

        return getWishList(email);
    }
}
