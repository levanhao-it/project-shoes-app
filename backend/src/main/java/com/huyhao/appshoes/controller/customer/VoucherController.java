package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.voucher.VoucherRequest;
import com.huyhao.appshoes.services.VoucherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/vouchers")
@Slf4j
public class VoucherController {
    private final VoucherService voucherService;


    @GetMapping("/list")
    public ResponseEntity<?> getVoucherList(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(voucherService.getVoucherList()));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @GetMapping()
    public ResponseEntity<?> getVoucherByCode(@RequestParam String code){
        try {
            return ResponseEntity.ok(ResponseCommon.success(voucherService.getVoucherByCode(code)));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }



}
