package com.huyhao.appshoes.payload.address;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class AddressResponse {
    private Long id;
    private String fullName;
    private String address;
    private String phoneNumber;
    private boolean defaultAddress;
}
