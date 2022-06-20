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
    private Long idAddress;
    private String firstName;
    private String lastName;
    private String address;
    private String phoneNumber;

}
