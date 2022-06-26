package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/address")
@RequiredArgsConstructor
@Slf4j
public class AddressAdminController {
    private final AddressService addressService;

    @GetMapping()
    public ResponseEntity<?> getAddressListByUser(@RequestParam Long idUser){
        try {
            return ResponseEntity.ok(ResponseCommon.success(addressService.getAddressListByUser(idUser)));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{idAddress}")
    public ResponseEntity<?> deleteAddress(@PathVariable Long idAddress){
        try {
            addressService.deleteAddress(idAddress);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }
}
