package com.huyhao.appshoes.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTCreator;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.impl.PublicClaims;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.entity.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
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
        Boolean isRefreshToken = getClaimValue(token, AppConstant.REFRESH_TOKEN_CLAIM, Boolean.class);
        return isRefreshToken == null || Boolean.FALSE.equals(isRefreshToken);
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
        return this.getToken(user, this.properties.getToken().getAccessLifetimeMinutes(), false);
    }

    public String generateRefreshToken(Users user, boolean isRememberMe){
        return this.getToken(user, this.getRefreshTokenLifeTimeMinutes(isRememberMe), true);
    }

    public int getRefreshTokenLifeTimeMinutes(boolean isRememberMe){
        return isRememberMe ? this.properties.getRememberMe().getExpiredDays() * 24 * 60 : this.properties.getToken().getRefreshLifetimeMinutes();
    }

    public boolean isNoneValidToken(String token) {
        if(StringUtils.isEmpty(token)) return true;
        try {
            JWTVerifier verifier = JWT.require(algorithm).build();
            DecodedJWT decoded = verifier.verify(token);
            Long expiredTime = decoded.getExpiresAt().getTime();
            return System.currentTimeMillis() >= expiredTime;
        }catch (JWTVerificationException ex){
            log.error("Token is invalid: {}", token, ex);
        }
        return true;
    }

    private <T> T getClaimValue(String token, String claimName, Class<T> clazz) {
        if(isNoneValidToken(token)) return null;
        DecodedJWT decoded = JWT.decode(token);
        return decoded.getClaim(claimName).as(clazz);
    }



    private String getToken(Users appUser, int expiredMinutes, boolean isRefreshToken){
        Calendar calendar = Calendar.getInstance();

        calendar.add(Calendar.MINUTE, expiredMinutes);

        JWTCreator.Builder creator = JWT.create()
                .withSubject(appUser.getEmail())
                .withExpiresAt(calendar.getTime())
                .withIssuedAt(new Date())
                .withClaim(AppConstant.FULL_NAME_CLAIM, appUser.getFullName())
                .withClaim(AppConstant.ROLE_CLAIM, appUser.getRole().getCode());

        if(isRefreshToken){
            creator.withClaim(AppConstant.REFRESH_TOKEN_CLAIM, true);
        }else{
            creator.withClaim(AppConstant.ACCESS_TOKEN_CLAIM, true);
        }

        return creator.sign(algorithm);
    }

}
