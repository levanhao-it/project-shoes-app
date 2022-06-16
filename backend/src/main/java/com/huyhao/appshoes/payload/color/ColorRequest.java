package com.huyhao.appshoes.payload.color;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class ColorRequest {
    private String name;
    private String code;
}
