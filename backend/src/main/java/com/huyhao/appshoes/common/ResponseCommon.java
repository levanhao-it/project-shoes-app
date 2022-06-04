package com.huyhao.appshoes.common;

import com.huyhao.appshoes.payload.ResponseObject;

public class ResponseCommon {

    public static ResponseObject success(Object data){
        return ResponseObject.builder().status("OK").message("Query successfull").data(data).build();
    }

    public static ResponseObject fail(String message){
        return ResponseObject.builder().status("Failed").message("message").build();
    }

}

