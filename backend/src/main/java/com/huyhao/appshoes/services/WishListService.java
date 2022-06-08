package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.entity.WishList;
import com.huyhao.appshoes.payload.wisList.WishListRequest;
import com.huyhao.appshoes.repositories.ProductRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import com.huyhao.appshoes.repositories.WishListRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WishListService {
    private final WishListRepository wishListRepository;
    private final UserRepository userRepository;

    private final ProductRepository productRepository;


    public void createWishList(WishListRequest wishListRequest) {
        String currentMail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(!currentMail.equals(wishListRequest.getEmail())){
            throw new IllegalArgumentException("Email not must be current email");
        }

        Users userApp = userRepository.findByEmail(wishListRequest.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Product product = productRepository.findByIdAndActiveTrue(wishListRequest.getProductId())
                .orElseThrow(() -> new IllegalArgumentException("not found product from productId"));

        WishList wishList = WishList.builder().product(product).users(userApp).active(true).build();

        wishListRepository.save(wishList);
    }

    public List<WishList> getWishList(String email) {
        String currentEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        if(email != currentEmail){
            throw new IllegalArgumentException("Email not must be current email");
        }

        Users userApp = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        List<WishList> wishLists = wishListRepository.findByUsersId(userApp.getId());

        return wishLists;
    }
}
