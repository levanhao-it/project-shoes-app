package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.AddressService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin/address")
@RequiredArgsConstructor
@Slf4j
public class AddressAdminController {
    private final AddressService addressService;

    @GetMapping("/{idUser}")
    public ResponseEntity<?> getAddressListByUser(@PathVariable Long idUser){
        try {
            return ResponseEntity.ok(ResponseCommon.success(addressService.getAddressListByUser(idUser)));
        } catch (Exception ex) {
            log.error("API /api/address: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }
}
