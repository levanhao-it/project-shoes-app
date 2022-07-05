package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
@Slf4j
public class UserController {
    private final AuthService authService;

    @GetMapping("")
    public ResponseEntity<?> getUser(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(authService.getUserByEmail()));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }
    @PutMapping("")
    public ResponseEntity<?> editUser( @RequestPart(value = "userRequest", required = false) String userRequest,
                                       @RequestPart(value = "fileImg", required = false) MultipartFile fileImg){
        try {
            authService.updateUser(userRequest,fileImg);
            return ResponseEntity.status(HttpStatus.OK).body(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/category/create: ", ex);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ResponseCommon.fail(ex.getMessage()));
        }
    }



}
