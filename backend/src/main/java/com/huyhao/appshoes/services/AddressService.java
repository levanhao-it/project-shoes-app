package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.AddressDelivery;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.payload.address.AddressRequest;
import com.huyhao.appshoes.payload.address.AddressResponse;
import com.huyhao.appshoes.repositories.AddressDeliveryRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddressService {
    private final AddressDeliveryRepository addressDeliveryRepository;
    private final UserRepository userRepository;


    public List<AddressResponse> getAddressListByUser(String email) {
        Users user = userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user"));


        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(user.getId());

        List<AddressResponse> addressResponses = addressDeliveryList.stream().map(e -> AddressResponse.builder()
                .id(e.getId())
                .fullName(e.getFullName())
                .address(e.getAddress())
                .phoneNumber(e.getPhoneNumber())
                .defaultAddress(e.isDefaultAddress())
                .build()
        ).collect(Collectors.toList());

        return addressResponses;

    }

    public AddressResponse getAddressById(Long idAddress) {

        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndActiveTrue(idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressId"));

        return AddressResponse.builder()
                .id(addressDelivery.getId())
                .fullName(addressDelivery.getFullName())
                .address(addressDelivery.getAddress())
                .phoneNumber(addressDelivery.getPhoneNumber())
                .defaultAddress(addressDelivery.isDefaultAddress())
                .build();
    }

    public void createAddress(AddressRequest request) {
        Users user = userRepository.findByEmailAndActiveTrue(request.getEmail())
                .orElseThrow(()->new IllegalArgumentException("Not found user"));

        List<AddressDelivery> addressList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(user.getId());

        if(request.isDefaultAddress()){
            for(AddressDelivery a : addressList) {
                a.setDefaultAddress(false);
                addressDeliveryRepository.save(a);
            }
        }

        AddressDelivery addressDelivery = AddressDelivery.builder()
                .address(request.getAddress())
                .fullName(request.getFullName())
                .phoneNumber(request.getPhoneNumber())
                .users(user)
                .defaultAddress(request.isDefaultAddress())
                .active(true)
                .build();

        addressDeliveryRepository.save(addressDelivery);
    }

    public void updateAddress(Long idAddress, AddressRequest request) {
        Users user = userRepository.findByEmailAndActiveTrue(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Not found user"));

        AddressDelivery addressDelivery = addressDeliveryRepository
                .findByIdAndUsersIdAndActiveTrue(idAddress, user.getId())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from address id"));

        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository
                .findAllByActiveTrueAndUsersId(user.getId());



        String fullName = request.getFullName();
        if(fullName != null && fullName.length() > 0 ){
            addressDelivery.setFullName(fullName);
        }

        String address = request.getAddress();
        if(address != null && address.length() > 0 ){
            addressDelivery.setAddress(address);
        }

        String phoneNumber = request.getPhoneNumber();
        if(phoneNumber != null && phoneNumber.length() > 0 ){
            addressDelivery.setPhoneNumber(phoneNumber);
        }

        boolean isDefault = request.isDefaultAddress();
        if(isDefault && !addressDelivery.isDefaultAddress()){
            for(AddressDelivery a : addressDeliveryList){
                if(a.getId() == addressDelivery.getId()){
                    addressDelivery.setDefaultAddress(true);
                }else{
                    a.setDefaultAddress(false);
                    addressDeliveryRepository.save(a);
                }

            }
        }

        addressDeliveryRepository.save(addressDelivery);
    }


    public void deleteAddress(Long idAddress) {
        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndActiveTrue(idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found Address from idAddress"));
        addressDelivery.setActive(false);
        addressDeliveryRepository.save(addressDelivery);
    }

}
