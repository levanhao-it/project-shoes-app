package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.address.AddressRequest;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.repositories.UserRepository;
import com.huyhao.appshoes.services.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/address")
@RequiredArgsConstructor
@Slf4j
public class AddressController {
    private final AddressService addressService;
    private final UserRepository userRepository;

    @GetMapping("/{idUser}")
    public ResponseEntity<?> getAddressListByUser(@PathVariable Long idUser){
        try {
            return ResponseEntity.ok(ResponseCommon.success(addressService.getAddressListByUser(idUser)));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PostMapping()
    public ResponseEntity<?> createAddress(@RequestBody AddressRequest addressRequest){
        try {
            addressService.createAddress(addressRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{idAddress}")
    public ResponseEntity<?> updateAddress(@RequestBody AddressRequest addressRequest, @PathVariable Long idAddress){
        try {
            addressService.updateAddress(idAddress, addressRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{idAddress}")
    public ResponseEntity<?> deleteAddressByUser(@PathVariable Long idAddress){
        try {
            addressService.deleteAddressWithCustomer(idAddress);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

}
