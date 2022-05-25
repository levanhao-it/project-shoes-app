package com.huyhao.appshoes.jwt;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Users;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;

@Slf4j
public class AuthorizationFilter extends OncePerRequestFilter {
    @Autowired
    private JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String authorizationHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        if(authorizationHeader != null && authorizationHeader.startsWith(AppConstant.BEARER)){
            try {
                String token = authorizationHeader.substring(AppConstant.BEARER.length());
                if(jwtProvider.isValidAccessToken(token)){
                    Users appUser = jwtProvider.getUserFromToken(token);
                    UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(appUser.getEmail(), null,
                            Collections.singleton(new SimpleGrantedAuthority(appUser.getRole().getCode())));
                    SecurityContextHolder.getContext().setAuthentication(authenticationToken);
                }
            } catch (Exception e) {
                log.error("Error request: {}", e.getMessage());
            }
            filterChain.doFilter(request,response);
        }else {
            filterChain.doFilter(request,response);
        }
    }

}
