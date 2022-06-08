package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.entity.WishList;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.product.ProductRequest;
import com.huyhao.appshoes.payload.wisList.WishListRequest;
import com.huyhao.appshoes.repositories.UserRepository;
import com.huyhao.appshoes.repositories.WishListRepository;
import com.huyhao.appshoes.services.WishListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/wishList")
@Slf4j
public class WishListController {
    private final WishListService wishListService;

    @PostMapping()
    public ResponseEntity<?> createWishList(@RequestBody WishListRequest wishListRequest){
        try {
            wishListService.createWishList(wishListRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @GetMapping()
    public ResponseEntity<?> getWishList(@RequestParam String email){
        try {

            return ResponseEntity.ok(ResponseCommon.success(wishListService.getWishList(email)));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

}
