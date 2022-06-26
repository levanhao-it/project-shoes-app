package com.huyhao.appshoes.payload.address;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressRequest {
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;
    private Long idUser;
    private boolean defaultAddress;

}
