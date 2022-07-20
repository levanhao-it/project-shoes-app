package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.color.ColorRequest;
import com.huyhao.appshoes.payload.optionalDelivery.OptionalDeliveryRequest;
import com.huyhao.appshoes.services.OptionalDeliveryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/delivery")
@RequiredArgsConstructor
@Slf4j
public class OptionalDeliveryAdminController {
    private final OptionalDeliveryService optionalDeliveryService;

    @PostMapping()
    public ResponseEntity<?> createOptionalDelivery(@RequestBody OptionalDeliveryRequest optionalDeliveryRequest){
        try {
            optionalDeliveryService.createOptionalDelivery(optionalDeliveryRequest);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @PutMapping("/{optionalDeliveryId}")
    public ResponseEntity<?> updateOptionalDelivery(@PathVariable Long optionalDeliveryId, @RequestBody OptionalDeliveryRequest optionalDeliveryRequest){
        try {
            optionalDeliveryService.updateDeliveryOptional(optionalDeliveryId, optionalDeliveryRequest);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @DeleteMapping("/{optionalDeliveryId}")
    public ResponseEntity<?> updateOptionalDelivery(@PathVariable Long optionalDeliveryId){
        try {
            optionalDeliveryService.deleteOptionalDelivery(optionalDeliveryId);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }
}
