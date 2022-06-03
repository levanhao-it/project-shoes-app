package com.huyhao.appshoes.payload;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
@AllArgsConstructor
public class ResponseObject {
    private String status;
    private String message;
    private Object data;
}
