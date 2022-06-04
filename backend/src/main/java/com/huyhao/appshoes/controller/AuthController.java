package com.huyhao.appshoes.controller;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.jwt.JwtProvider;
import com.huyhao.appshoes.payload.AuthRequest;
import com.huyhao.appshoes.payload.AuthResponse;
import com.huyhao.appshoes.services.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AuthController {

    private final AuthService authService;
    private final JwtProvider jwtProvider;

    @PostMapping("/login")
    public ResponseEntity<?> loginCustomer(@RequestBody AuthRequest loginRequest, HttpServletResponse response){
        try {
            Users appUser = authService.checkLoginCustomer(loginRequest);
            AuthResponse authResponse = getAuthResponse(appUser, loginRequest.getIsRemember(), response);
          return ResponseEntity.ok(authResponse);
        }
        catch (IllegalArgumentException e){
            log.error("API /api/login: ", e);
            return ResponseEntity.ok().body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body("Server Error");
        }

    }

    @PostMapping("/admin/login")
    public ResponseEntity<?> loginAdmin(@RequestBody AuthRequest loginRequest, HttpServletResponse response){
        try {
            Users appUser = authService.checkLoginAdmin(loginRequest);
            AuthResponse authResponse = getAuthResponse(appUser, loginRequest.getIsRemember(), response);
            return ResponseEntity.ok(authResponse);
        }
        catch (IllegalArgumentException e){
            log.error("API /api/login: ", e);
            return ResponseEntity.ok().body(e.getMessage());
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().body("Server Error");
        }
    }

    @GetMapping("/logout")
    public ResponseEntity<Object> logout(HttpServletResponse response){
        addRefreshTokenToCookie(response, null, 0);
        return ResponseEntity.ok().body(null);
    }

    @GetMapping("/token/refresh")
    public ResponseEntity<Object> refreshToken(@CookieValue(value = AppConstant.REFRESH_TOKEN_KEY, required = false)Cookie tokeCookie){
        if(tokeCookie == null || jwtProvider.isNoneValidRefreshToken(tokeCookie.getValue())){
            log.error("Fail to refesh token");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        Users appUser = jwtProvider.getUserFromToken(tokeCookie.getValue());
        String accessToken = jwtProvider.generateRefreshToken(appUser);
        AuthResponse authResponse = AuthResponse.builder().accessToken(accessToken).build();
        return ResponseEntity.ok(authResponse);
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
