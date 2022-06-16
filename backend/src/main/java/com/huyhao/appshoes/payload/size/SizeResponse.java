package com.huyhao.appshoes.payload.size;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class SizeResponse {
    private Long id;
    private String name;
}
