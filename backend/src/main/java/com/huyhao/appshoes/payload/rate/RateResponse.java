package com.huyhao.appshoes.payload.rate;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RateResponse {
    private Long idRate;
    private double rating;
    private String content;
    private String userName;
    private Date modifyDate;
}
