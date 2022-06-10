package com.huyhao.appshoes.payload.rate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RateRequest {
    private double rating;
    private String content;
    private Long productId;
}
