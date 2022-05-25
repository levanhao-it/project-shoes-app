package com.huyhao.appshoes.controller;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.jwt.JwtProvider;
import com.huyhao.appshoes.payload.AuthRequest;
import com.huyhao.appshoes.payload.AuthResponse;
import com.huyhao.appshoes.services.AuthService;
import lombok.RequiredArgsConstructor;
import org.apache.catalina.User;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody AuthRequest loginRequest, HttpServletResponse response){
        return null;
    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AuthRequest loginRequest, HttpServletResponse response){
        return null;
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletResponse response){
        return null;
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<Object> refreshToken(@CookieValue(value = AppConstant.REFRESH_TOKEN_KEY, required = false)Cookie tokeCookie){
        return null;
    }

    private AuthResponse getAuthResponse(Users appUser, boolean isRemember, HttpServletResponse response){
        String accessToken = jwtProvider.generateAccessToken(appUser);
        String refreshToken = jwtProvider.generateRefreshToken(appUser);
        addRefreshTokenToCookie(response, refreshToken, jwtProvider.getRefreshTokenTimeMinutes(isRemember) * 60);
        return AuthResponse.builder().accessToken(accessToken).build();
    }

    private void addRefreshTokenToCookie(HttpServletResponse response, String refreshToken, int maxAgeSeconds) {
        Cookie cookie = new Cookie(AppConstant.REFRESH_TOKEN_KEY, refreshToken);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(maxAgeSeconds);
        response.addCookie(cookie);
    }


}
