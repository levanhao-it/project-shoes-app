package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.rate.RateRequest;
import com.huyhao.appshoes.services.RateService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/rate")
@Slf4j
public class RateController {
    private final RateService rateService;

    @GetMapping("/{productId}")
    public ResponseEntity<?> getRate(@PathVariable Long productId){
        try {
            return ResponseEntity.ok(ResponseCommon.success(rateService.getAllRate(productId)));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }
    @PostMapping()
    public ResponseEntity<?> addRate(@RequestBody RateRequest rateRequest){
        try {
            rateService.addRate(rateRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{rateId}")
    public ResponseEntity<?> updateProduct(@PathVariable Long rateId, @RequestBody RateRequest rateRequest){
        try {
            rateService.updateRate(rateId, rateRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }


    @DeleteMapping("/{rateId}")
    public ResponseEntity<?> deleteProduct(@PathVariable Long rateId){
        try {
            rateService.deleteRate(rateId);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }



}
