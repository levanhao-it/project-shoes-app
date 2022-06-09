package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
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

@Service
@RequiredArgsConstructor
public class CartServices {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductDetailRepository productDetailRepository;
    private final UserRepository userRepository;


    public void addToCart(AddToCartRequest addToCartRequest) {
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));


        ProductDetail productDetail = productDetailRepository.findById(addToCartRequest.getProductDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));

        Cart cart=cartRepository.findByUsersId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Not found cart from user"));
        CartItem cartItem =cartItemRepository.findByCartAndProductDetail(cart,productDetail);
        if(cartItem!=null){
            cartItem.setQuantity(cartItem.getQuantity()+addToCartRequest.getQuantity());
        }
        else{
            cartItem = CartItem.builder()
                    .productDetail(productDetail)
                    .cart(user.getCart())
                    .quantity(addToCartRequest.getQuantity())
                    .build();
        }
        cartItemRepository.save(cartItem);

    }

    public void changeCart(AddToCartRequest addToCartRequest){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));


        ProductDetail productDetail = productDetailRepository.findById(addToCartRequest.getProductDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));
        Cart cart=cartRepository.findByUsersId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Not found cart from user"));
        CartItem cartItem =cartItemRepository.findByCartAndProductDetail(cart,productDetail);
        if(cartItem!=null){
            cartItem.setQuantity(addToCartRequest.getQuantity());
        }
        cartItemRepository.saveAndFlush(cartItem);

    }

    public void removeCartItem(Long productDetailId){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));
        ProductDetail productDetail = productDetailRepository.findById(productDetailId)
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));
        Cart cart=cartRepository.findByUsersId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Not found cart from user"));
        CartItem cartItem =cartItemRepository.findByCartAndProductDetail(cart,productDetail);
        cartItemRepository.deleteById(cartItem.getId());

    }

    public CartResponse getCart(){
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user=userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        List<CartItem> cartItemList = cartItemRepository.findAllByCartId(user.getCart().getId());

        List<CartItemResponse> cartItemResponses = new ArrayList<>();

        for(CartItem cartItem : cartItemList){
            Product product = cartItem.getProductDetail().getProduct();
            ProductDetail productDetail = cartItem.getProductDetail();

            CartItemResponse cartItemResponse = CartItemResponse.builder()
                    .id(cartItem.getId())
                    .name(product.getName())
                    .originalPrice(product.getOriginalPrice())
                    .salePrice(productDetail.getSalePrice())
                    .color(productDetail.getColor())
                    .size(productDetail.getSize())
                    .quantity(cartItem.getQuantity())
                    .build();
            cartItemResponses.add(cartItemResponse);

        }

        return CartResponse.builder()
                .id(user.getId())
                .cartItemResponsesList(cartItemResponses)
                .build();
    }




}
