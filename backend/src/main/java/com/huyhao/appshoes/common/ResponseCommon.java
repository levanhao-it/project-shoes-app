package com.huyhao.appshoes.common;

import com.huyhao.appshoes.payload.common.ResponseObject;

public class ResponseCommon {

    public static ResponseObject success(Object data){
        return ResponseObject.builder().status("OK").message("Query successfully").data(data).build();
    }

    public static ResponseObject fail(String message){
        return ResponseObject.builder().status("Failed").message("message").build();
    }

}

