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


    public List<AddressResponse> getAddressListByUser(Long userId) {
        boolean hasUser = userRepository.existsByIdAndActiveTrue(userId);

        if(!hasUser){
            throw new IllegalArgumentException("Not found user from userId");
        }


        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(userId);

        List<AddressResponse> addressResponses = addressDeliveryList.stream().map(e -> AddressResponse.builder()
                .id(e.getId())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
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
                .firstName(addressDelivery.getFirstName())
                .lastName(addressDelivery.getLastName())
                .address(addressDelivery.getAddress())
                .phoneNumber(addressDelivery.getPhoneNumber())
                .defaultAddress(addressDelivery.isDefaultAddress())
                .build();
    }

    public void createAddress(AddressRequest request) {
        Users user = userRepository.findByIdAndActiveTrue(request.getIdUser())
                .orElseThrow(()->new IllegalArgumentException("Not found user"));

        List<AddressDelivery> addressList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(request.getIdUser());

        if(request.isDefaultAddress()){
            for(AddressDelivery a : addressList) {
                a.setDefaultAddress(false);
                addressDeliveryRepository.save(a);
            }
        }

        AddressDelivery addressDelivery = AddressDelivery.builder()
                .address(request.getAddress())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .users(user)
                .defaultAddress(request.isDefaultAddress())
                .active(true)
                .build();

        addressDeliveryRepository.save(addressDelivery);
    }

    public void updateAddress(Long idAddress, AddressRequest request) {
        AddressDelivery addressDelivery = addressDeliveryRepository
                .findByIdAndUsersIdAndActiveTrue(idAddress, request.getIdUser())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from address id"));

        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository
                .findAllByActiveTrueAndUsersId(request.getIdUser());


        String firstName = request.getFirstName();
        if(firstName != null && firstName.length() > 0 ){
            addressDelivery.setFirstName(firstName);
        }

        String lastName = request.getLastName();
        if(lastName != null && lastName.length() > 0 ){
            addressDelivery.setLastName(lastName);
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
