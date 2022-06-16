package com.huyhao.appshoes.payload.size;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class SizeRequest {
    private String name;
}
