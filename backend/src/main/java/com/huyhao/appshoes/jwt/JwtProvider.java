package com.huyhao.appshoes.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.impl.PublicClaims;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.util.Calendar;
import java.util.Date;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtProvider {
    private static final Algorithm algorithm = Algorithm.HMAC256(AppConstant.SECRET_KEY);
    private final TokenProperties properties;

    public boolean isValidAccessToken(String token) {
        return !isNoneValidAccessToken(token);
    }

    public boolean isNoneValidAccessToken(String token) {
        if(isNoneValidToken(token)) return true;
        Boolean isAccessToken = getClaimValue(token, AppConstant.ACCESS_TOKEN_CLAIM, Boolean.class);
        return isAccessToken == null || Boolean.FALSE.equals(isAccessToken);
    }

    public boolean isNoneValidRefreshToken(String token){
        if(isNoneValidToken(token)) return true;
        Boolean isAccessToken = getClaimValue(token, AppConstant.REFRESH_TOKEN_CLAIM, Boolean.class);
        return isAccessToken == null || Boolean.FALSE.equals(isAccessToken);
    }

    public Users getUserFromToken(String token){
        if(isNoneValidToken(token)) return null;

        String role = getClaimValue(token, AppConstant.ROLE_CLAIM, String.class);
        String fullName = getClaimValue(token, AppConstant.FULL_NAME_CLAIM, String.class);
        String email = getClaimValue(token, PublicClaims.SUBJECT, String.class);

        return Users.builder()
                .fullName(fullName)
                .email(email)
                .role(Role.builder().code(role).build())
                .build();

    }

    public String generateAccessToken(Users user){
        return getToken(user, this.properties.getToken().getAccessLifetimeMinutes(), false);
    }

    public String generateRefreshToken(Users user){
        return getToken(user, this.properties.getToken().getRefreshLifetimeMinutes(), true);
    }

    public int getRefreshTokenTimeMinutes(boolean isRememberMe){
        return isRememberMe ? this.properties.getRememberMe().getExpiredDays() * 24 * 60 : this.properties.getToken().getRefreshLifetimeMinutes();
    }

    private <T> T getClaimValue(String token, String claimName, Class<T> clazz) {
        if(isNoneValidToken(token)) return null;
        DecodedJWT decoded = JWT.decode(token);

        return decoded.getClaim(claimName).as(clazz);
    }

    public boolean isNoneValidToken(String token) {
        return false;
    }

    private String getToken(Users appUser, int expiredMinutes, boolean isRefreshToken){
        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.MINUTE, expiredMinutes);

        JWTCreator.Builder creator = JWT.create()
                .withSubject(appUser.getEmail())
                .withExpiresAt(calendar.getTime())
                .withIssuedAt(new Date())
                .withClaim(AppConstant.ROLE_CLAIM, appUser.getRole().getCode());

        if(isRefreshToken){
            creator.withClaim(AppConstant.REFRESH_TOKEN_CLAIM, true);
        }else{
            creator.withClaim(AppConstant.ACCESS_TOKEN_CLAIM, true);
        }

        return creator.sign(algorithm);
    }

}
