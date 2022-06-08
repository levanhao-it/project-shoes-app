package com.huyhao.appshoes.payload.wisList;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class WishListRequest {
    private Long productId;
    private String email;
}
