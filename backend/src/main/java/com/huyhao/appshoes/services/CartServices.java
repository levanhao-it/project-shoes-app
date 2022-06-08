package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Cart;
import com.huyhao.appshoes.entity.CartItem;
import com.huyhao.appshoes.entity.ProductDetail;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.payload.cart.AddToCartRequest;
import com.huyhao.appshoes.payload.cart.CartItemResponse;
import com.huyhao.appshoes.payload.cart.CartResponse;
import com.huyhao.appshoes.repositories.CartItemRepository;
import com.huyhao.appshoes.repositories.CartRepository;
import com.huyhao.appshoes.repositories.ProductDetailRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CartServices {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private  final ProductDetailRepository productDetailRepository;
    private final UserRepository userRepository;

    public CartResponse addToCart(AddToCartRequest addToCartRequest) {
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
       Users user=userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));


        ProductDetail productDetail = productDetailRepository.findById(addToCartRequest.getProductDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));;

        CartItem cartItem=CartItem.builder()
                .productDetail(productDetail)
                .quantity(addToCartRequest.getQuantity())
                .cart(user.getCart())
                .build();
        cartItemRepository.save(cartItem);

        List<CartItem> cartItemList= new ArrayList<>();
        cartItemList.add(cartItem);

        Cart cart=Cart.builder()
                .users(user)
                .cartItemList(cartItemList)
                .build();
        cartRepository.save(cart);

        return CartResponse.builder()
                .id(cart.getId())
                .cartItemResponsesList(cartItemList.stream().map(e-> CartItemResponse.builder()
                        .productDetail_id(e.getId())
                        .quantity(e.getQuantity())
                        .build()).collect(Collectors.toList()))
                .build();

    }

    public CartResponse getCart(){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user=userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        List<CartItemResponse> cartItemList=cartItemRepository.findAllByCartId(user.getId());
        return CartResponse.builder()
                .id(user.getId())
                .cartItemResponsesList(cartItemList)
                .build();
    }






}
