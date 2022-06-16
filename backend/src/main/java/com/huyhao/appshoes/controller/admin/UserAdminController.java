package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.auth.RegistrationRequest;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@RequiredArgsConstructor
@Slf4j
public class UserAdminController {
    private final AuthService authService;

    @GetMapping("")
    public ResponseEntity<?> getAllUser(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(authService.getAllUser()));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserById(@PathVariable Long userId ){
        try {
            return ResponseEntity.ok(ResponseCommon.success(authService.getUserById(userId)));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }
    @PutMapping("/{userId}")
    public ResponseEntity<?> editCategory(@PathVariable Long userId, @RequestBody RegistrationRequest request){
        try {
            authService.updateUserById(userId,request);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }

    @DeleteMapping("/{userId}")
    public ResponseEntity<?> deleteUser(@PathVariable Long userId){
        try {
            authService.deleteUserById(userId);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/wishList: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }


}
