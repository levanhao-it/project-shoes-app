package com.huyhao.appshoes.services;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.payload.AuthRequest;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    public Users checkLoginCustomer(AuthRequest loginRequest) {
        Users user = userRepository.findByEmailAndActiveTrueAndRoleCode(loginRequest.getEmail(), AppConstant.CUSTOMER_ROLE);

        if(user == null){
            throw new IllegalArgumentException("Email or password is incorrect");
        }

        if(loginRequest.getPassword().equals(user.getPassword())){
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

        if(loginRequest.getPassword().equals(user.getPassword())){
            return user;
        }
        else {
            throw new IllegalArgumentException("Email or password is incorrect");
        }
    }
}
