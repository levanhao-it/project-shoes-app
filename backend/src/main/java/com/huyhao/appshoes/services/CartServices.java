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

@Service
@RequiredArgsConstructor
public class CartServices {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductDetailRepository productDetailRepository;
    private final UserRepository userRepository;

    public CartItemResponse addToCart(AddToCartRequest addToCartRequest,String action) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Please login to purchase!"));
        ProductDetail productDetail = productDetailRepository.findById(addToCartRequest.getProductDetailId())
                .orElseThrow(() -> new IllegalArgumentException("Not found productDetail from productDetailId"));
        Cart cart=cartRepository.findByUsersId(user.getId());

        CartItem cartItem =cartItemRepository.findByCartAndProductDetail(cart,productDetail);

        if(!action.isEmpty()){
            switch (action){
                case "add":
                    if(cartItem!=null){
                        cartItem.setQuantity(cartItem.getQuantity()+addToCartRequest.getQuantity());

                    }
                    else{
                        cartItem=CartItem.builder()
                                .productDetail(productDetail)
                                .cart(cart)
                                .quantity(addToCartRequest.getQuantity())
                                .build();
                    }
                    cartItemRepository.saveAndFlush(cartItem);
                    break;
                case "change":
                    cartItem.setQuantity(addToCartRequest.getQuantity());
                    cartItemRepository.saveAndFlush(cartItem);
                    break;
                case "remove":
                    cartItemRepository.deleteById(cartItem.getId());
                    break;
            }
        }
        return CartItemResponse.builder()
                .productDetail_id(productDetail.getId())
                .quantity(addToCartRequest.getQuantity())
                .build();

    }

    public List<CartResponse> getCart() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Please login to go to cart!"));

        Cart cart=cartRepository.findByUsersId(user.getId());

        List<CartItem> cartItemList = cartItemRepository.findAllByCartId(cart.getId());
        List<CartResponse> result= new ArrayList<>();
        for (CartItem cartItem:cartItemList){
            CartResponse cartResponse=CartResponse.builder()
                    .productDetail(cartItem.getProductDetail())
                    .quantity(cartItem.getQuantity())
                    .build();
            result.add(cartResponse);
        }
        return result;

    }


}
