package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.size.SizeRequest;
import com.huyhao.appshoes.services.SizeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/sizes")
@RequiredArgsConstructor
@Slf4j
public class SizeAdminController {
    private final SizeService sizeService;

    @PostMapping()
    public ResponseEntity<?> createSize(@RequestParam String name){
        try {
            sizeService.creteSize(name);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }
    @PutMapping("/{sizeId}")
    public ResponseEntity<?> updateSize(@PathVariable Long sizeId, @RequestParam String name){
        try {
            sizeService.updateSize(sizeId, name);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @DeleteMapping("/{sizeId}")
    public ResponseEntity<?> deleteSize(@PathVariable Long sizeId){
        try {
            sizeService.deleteSize(sizeId);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }
}
