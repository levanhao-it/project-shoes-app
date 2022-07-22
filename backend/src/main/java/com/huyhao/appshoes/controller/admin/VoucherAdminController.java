package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.voucher.VoucherRequest;
import com.huyhao.appshoes.services.VoucherService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/vouchers")
@RequiredArgsConstructor
@Slf4j
public class VoucherAdminController {
    private final VoucherService voucherService;

    @GetMapping()
    public ResponseEntity<?> getVoucherList(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(voucherService.getVoucherListInAdmin()));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @GetMapping("/{voucherId}")
    public ResponseEntity<?> getVoucher(@PathVariable Long voucherId){
        try {
            return ResponseEntity.ok(ResponseCommon.success(voucherService.getVoucherById(voucherId)));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }



    @PostMapping()
    public ResponseEntity<?> createVoucher(@RequestBody VoucherRequest voucherRequest){
        try {
            voucherService.createVoucher(voucherRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @PutMapping("/{idVoucher}")
    public ResponseEntity<?> updateVoucher(@RequestBody VoucherRequest voucherRequest, @PathVariable Long idVoucher){
        try {
            voucherService.updateVoucher(idVoucher, voucherRequest);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @DeleteMapping("/{idVoucher}")
    public ResponseEntity<?> deleteVoucher(@PathVariable Long idVoucher){
        try {
            voucherService.deleteVoucher(idVoucher);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

}
