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


    public void createAddress(AddressRequest request) {
        Users user=userRepository.findById(request.getIdUser()).orElseThrow(()->new IllegalArgumentException("Not found user"));
        AddressDelivery addressDelivery = AddressDelivery.builder()
                .address(request.getAddress())
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .phoneNumber(request.getPhoneNumber())
                .users(user)
                .active(true)
                .build();

        addressDeliveryRepository.save(addressDelivery);
    }

    public void updateAddress(Long idAddress, AddressRequest request) {
        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndUsersIdAndActiveTrue(request.getIdUser(),idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found Address from AddressId"));


        String firstName = request.getFirstName();
        if(firstName != null && firstName.length() > 0 ){
            addressDelivery.setFirstName(firstName);
        }
        String lastName = request.getLastName();
        if(lastName != null && lastName.length() > 0 ){
            addressDelivery.setFirstName(lastName);
        }
        String address = request.getAddress();
        if(address != null && address.length() > 0 ){
            addressDelivery.setAddress(address);
        }
        String phoneNumber = request.getPhoneNumber();
        if(phoneNumber != null && phoneNumber.length() > 0 ){
            addressDelivery.setPhoneNumber(phoneNumber);
        }


        addressDeliveryRepository.save(addressDelivery);
    }


    public void deleteAddressWithAdmin(Long idAddress,Long idUser) {
        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndUsersIdAndActiveTrue(idUser,idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found Address from idAddress"));

        addressDelivery.setActive(false);
        addressDeliveryRepository.save(addressDelivery);
    }

    public void deleteAddressWithCustomer(Long idAddress) {
        String email= SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Not found user from email"));
        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndUsersIdAndActiveTrue(user.getId(),idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found Address from idAddress"));

        addressDelivery.setActive(false);
        addressDeliveryRepository.save(addressDelivery);
    }

    public List<AddressResponse> getAddressListByUser(Long idUser) {
        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(idUser);

        List<AddressResponse> addressResponses = addressDeliveryList.stream().map(e -> AddressResponse.builder()
                        .idAddress(e.getId())
                        .firstName(e.getFirstName())
                        .lastName(e.getLastName())
                        .address(e.getAddress())
                        .phoneNumber(e.getPhoneNumber())
                        .build()
                ).collect(Collectors.toList());

        return addressResponses;

    }

    public List<AddressResponse> getAddressListByUserWithAdmin(Long idUser) {
        List<AddressDelivery> addressDeliveryList = addressDeliveryRepository.findAllByActiveTrueAndUsersId(idUser);

        List<AddressResponse> addressResponses = addressDeliveryList.stream().map(e -> AddressResponse.builder()
                .idAddress(e.getId())
                .firstName(e.getFirstName())
                .lastName(e.getLastName())
                .address(e.getAddress())
                .phoneNumber(e.getPhoneNumber())
                .build()
        ).collect(Collectors.toList());

        return addressResponses;

    }

    public AddressResponse getAddressById(Long idUser,Long idAddress) {

        AddressDelivery addressDelivery = addressDeliveryRepository.findByIdAndUsersIdAndActiveTrue(idUser, idAddress)
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressId"));

        return AddressResponse.builder()
                .idAddress(addressDelivery.getId())
                .firstName(addressDelivery.getFirstName())
                .lastName(addressDelivery.getLastName())
                .address(addressDelivery.getAddress())
                .phoneNumber(addressDelivery.getPhoneNumber())
                .build();
    }
}
