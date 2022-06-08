package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.cart.AddToCartRequest;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.CartServices;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@Slf4j
public class CartController {
    private final CartServices cartServices;
    @PostMapping("")
    public ResponseEntity<?> addCart(@RequestBody AddToCartRequest addToCartRequest){
        try {
            cartServices.addToCart(addToCartRequest);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }
    @GetMapping()
    public ResponseEntity<?> getCartItemList(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(cartServices.getCart()));
        } catch (Exception ex) {
            log.error("API /api/cart: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

}
