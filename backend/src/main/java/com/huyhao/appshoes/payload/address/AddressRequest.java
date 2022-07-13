package com.huyhao.appshoes.payload.address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {
    private String fullName;
    private String address;
    private String phoneNumber;
    private String email;
    private boolean defaultAddress;

}
