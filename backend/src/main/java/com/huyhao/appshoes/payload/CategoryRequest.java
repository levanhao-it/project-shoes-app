package com.huyhao.appshoes.payload;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class CategoryRequest {
    private String name;
    private String code;

}
