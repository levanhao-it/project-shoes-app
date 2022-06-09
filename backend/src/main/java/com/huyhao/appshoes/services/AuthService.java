package com.huyhao.appshoes.services;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Cart;
import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.jwt.JwtProvider;
import com.huyhao.appshoes.payload.auth.AuthRequest;
import com.huyhao.appshoes.payload.auth.AuthResponse;
import com.huyhao.appshoes.payload.auth.RegistrationRequest;
import com.huyhao.appshoes.repositories.CartRepository;
import com.huyhao.appshoes.repositories.RoleRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository rolesRepository;
    private final CartRepository cartRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    public Users checkLoginCustomer(AuthRequest loginRequest) {
        Users user = userRepository.findByEmailAndActiveTrue(loginRequest.getEmail());

        if(user == null){
            throw new IllegalArgumentException("Email or password is incorrect");
        }

        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return user;
        }
        else {
            throw new IllegalArgumentException("Email or password is incorrect");
        }

    }

    public Users checkLoginAdmin(AuthRequest loginRequest) {
        Users user = userRepository.findByEmailAndActiveTrueAndRoleCode(loginRequest.getEmail(), AppConstant.ADMIN_ROLE);

        if(user == null){
            throw new IllegalArgumentException("Email or password is incorrect");
        }

        if(passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            return user;
        }
        else {
            throw new IllegalArgumentException("Email or password is incorrect");
        }
    }

    public AuthResponse register(RegistrationRequest registrationRequest){
        if(userRepository.findByEmailAndActiveTrue(registrationRequest.getEmail())!=null){
            throw new IllegalArgumentException("Email already exits");
        }
        Role role;
        if(registrationRequest.getRole_id()==""){
            role=rolesRepository.findByCode(AppConstant.CUSTOMER_ROLE);
        }
        else {
            role = rolesRepository.findByCode(AppConstant.ADMIN_ROLE);
        }
        Users user= userRepository.save(Users.builder()
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .fullName(registrationRequest.getFullName()).role(role).active(true)
                .build());
        Cart cart=cartRepository.save(Cart.builder()
                .users(user).build());
        return AuthResponse.builder().accessToken(jwtProvider.generateAccessToken(user)).build();
    }



}
