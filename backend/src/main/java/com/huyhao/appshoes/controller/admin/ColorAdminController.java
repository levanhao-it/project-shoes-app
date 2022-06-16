package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.color.ColorRequest;
import com.huyhao.appshoes.services.ColorService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/colors")
@RequiredArgsConstructor
@Slf4j
public class ColorAdminController {
    private final ColorService colorService;

    @PostMapping()
    public ResponseEntity<?> createColor(@RequestBody ColorRequest colorRequest){
        try {
            colorService.creteColor(colorRequest);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }
    @PutMapping("/{colorId}")
    public ResponseEntity<?> updateColor(@PathVariable Long colorId, @RequestBody ColorRequest colorRequest){
        try {
            colorService.updateColor(colorId, colorRequest);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @DeleteMapping("/{colorId}")
    public ResponseEntity<?> deleteColor(@PathVariable Long colorId){
        try {
            colorService.deleteColor(colorId);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }


}
