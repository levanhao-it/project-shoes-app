package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.services.OptionalDeliveryService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/delivery")
@RequiredArgsConstructor
@Slf4j
public class OptionDeliveryController {
    private final OptionalDeliveryService optionalDeliveryService;

    @GetMapping()
    public ResponseEntity<?> getOptionalDeliveryList(){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(optionalDeliveryService.getOptionalDeliveryList()));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @GetMapping("/{optionalDeliveryId}")
    public ResponseEntity<?> getOptionalDelivery(@PathVariable Long optionalDeliveryId){
        try {
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(optionalDeliveryService.getOptionalDelivery(optionalDeliveryId)));
        } catch (Exception ex) {
            log.error("API /: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }


}
