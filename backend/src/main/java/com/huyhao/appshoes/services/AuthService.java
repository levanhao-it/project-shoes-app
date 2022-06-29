package com.huyhao.appshoes.services;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Cart;
import com.huyhao.appshoes.entity.Orders;
import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.jwt.JwtProvider;
import com.huyhao.appshoes.payload.productDetail.auth.AuthRequest;
import com.huyhao.appshoes.payload.productDetail.auth.AuthResponse;
import com.huyhao.appshoes.payload.productDetail.auth.RegistrationRequest;
import com.huyhao.appshoes.payload.productDetail.auth.UserResponse;
import com.huyhao.appshoes.payload.order.OrderResponse;
import com.huyhao.appshoes.repositories.CartRepository;
import com.huyhao.appshoes.repositories.OrderRepository;
import com.huyhao.appshoes.repositories.RoleRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final RoleRepository rolesRepository;
    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;

    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;

    public Users checkLoginCustomer(AuthRequest loginRequest) {
        Users user = userRepository.findByEmailAndActiveTrue(loginRequest.getEmail()).orElse(null);

        if (user == null) {
            throw new IllegalArgumentException("Email or password is incorrect");
        }

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return user;
        } else {
            throw new IllegalArgumentException("Email or password is incorrect");
        }

    }

    public Users checkLoginAdmin(AuthRequest loginRequest) {
        Users user = userRepository.findByEmailAndActiveTrueAndRoleCode(loginRequest.getEmail(), AppConstant.ADMIN_ROLE);

        if (user == null) {
            throw new IllegalArgumentException("Email or password is incorrect");
        }

        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return user;
        } else {
            throw new IllegalArgumentException("Email or password is incorrect");
        }
    }

    public AuthResponse register(RegistrationRequest registrationRequest) {
        Users userApp = userRepository.findByEmailAndActiveTrue(registrationRequest.getEmail()).orElse(null);
        if (userApp != null) {
            throw new IllegalArgumentException("Email already exits");
        }

        Role role = rolesRepository.findByCode(AppConstant.CUSTOMER_ROLE);

        Users user = userRepository.save(Users.builder()
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .fullName(registrationRequest.getFullName())
                .role(role)
                .active(true)
                .build());

        Cart cart = Cart.builder().users(user).build();
        cartRepository.save(cart);

        return AuthResponse.builder().accessToken(jwtProvider.generateAccessToken(user)).build();
    }

    public List<UserResponse> getAllUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Please login to continues!"));

        List<Users> userList = userRepository.findAllByRoleCodeAndActiveTrue(AppConstant.CUSTOMER_ROLE);
        List<UserResponse> userResponses = new ArrayList<>();
        for (Users u : userList
        ) {
            int quantityOrder = orderRepository.findAllByUsersId(u.getId()).size();
            UserResponse userResponse = UserResponse.builder()
                    .idUser(u.getId())
                    .full_name(u.getFullName())
                    .email(u.getEmail())
                    .create_by(u.getCreatedBy())
                    .modify_date(u.getModifiedDate())
                    .quantityOrders(quantityOrder)
                    .password(u.getPassword())
                    .build();
            userResponses.add(userResponse);

        }
        return userResponses;
    }

    public UserResponse getUserById(Long id) {
        Users user = userRepository.findByIdAndActiveTrue(id).orElseThrow(() -> new IllegalArgumentException("Not found user from id"));
        int quantityOrder = orderRepository.findAllByUsersId(user.getId()).size();
        List<Orders> ordersList = orderRepository.findAllByUsersId(id);

        return UserResponse.builder()
                .idUser(user.getId())
                .full_name(user.getFullName())
                .email(user.getEmail())
                .create_by(user.getCreatedBy())
                .modify_date(user.getModifiedDate())
                .quantityOrders(quantityOrder)
                .password(user.getPassword())
                .orderResponseList(ordersList.stream().map(e -> OrderResponse.builder()
                        .id(e.getId())
                        .status(e.getStatus())
                        .createDate(e.getCreatedDate())
                        .subtotal(e.getPrice())
                        .build()).collect(Collectors.toList()))
                .build();

    }

    public void updateUserById(Long id,RegistrationRequest request){
        Users user = userRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Not found user from id"));
        Users userApp = userRepository.findByEmailAndActiveTrue(request.getEmail()).orElse(null);
        if (userApp != null&&userApp.getId()!=id) {
            throw new IllegalArgumentException("Email already exits");
        }
        user.setEmail(request.getEmail());
        user.setFullName(request.getFullName());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.saveAndFlush(user);
    }

    public void deleteUserById(Long id){
        Users user = userRepository.findByIdAndActiveTrue(id).orElseThrow(() -> new IllegalArgumentException("Not found user from id"));
        user.setActive(false);
        userRepository.saveAndFlush(user);

    }


}
