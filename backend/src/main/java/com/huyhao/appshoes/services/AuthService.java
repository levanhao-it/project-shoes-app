package com.huyhao.appshoes.services;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Orders;
import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.entity.Users;
import com.huyhao.appshoes.jwt.JwtProvider;
import com.huyhao.appshoes.payload.auth.*;
import com.huyhao.appshoes.payload.order.OrderResponse;
import com.huyhao.appshoes.repositories.CartRepository;
import com.huyhao.appshoes.repositories.OrderRepository;
import com.huyhao.appshoes.repositories.RoleRepository;
import com.huyhao.appshoes.repositories.UserRepository;
import com.huyhao.appshoes.utils.AmazonUtil;
import com.huyhao.appshoes.utils.JsonUtil;
import lombok.RequiredArgsConstructor;
import net.bytebuddy.utility.RandomString;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
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
    public final AmazonUtil amazonUtil;

    public final JavaMailSender mailSender;


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

    public AuthResponse register(RegistrationRequest registrationRequest) throws MessagingException, UnsupportedEncodingException {
        Users userApp = userRepository.findByEmailAndActiveTrue(registrationRequest.getEmail()).orElse(null);
        if (userApp != null) {
            throw new IllegalArgumentException("Email already exits");
        }
        String randomCode = RandomString.make(64);

        Role role = rolesRepository.findByCode(AppConstant.CUSTOMER_ROLE);

        Users user = userRepository.save(Users.builder()
                .email(registrationRequest.getEmail())
                .password(passwordEncoder.encode(registrationRequest.getPassword()))
                .fullName(registrationRequest.getFullName())
                .role(role)
                .verificationCode(randomCode)
                .active(false)
                .build());
        sendVerificationEmail(user);
        return AuthResponse.builder().accessToken(jwtProvider.generateAccessToken(user)).build();
    }

    public void verify(String verificationCode) {
        Users user = userRepository.findByVerificationCode(verificationCode).orElseThrow(()-> new IllegalArgumentException("Not found user by verificationCode"));

        if (user.isActive()) {
            throw new IllegalArgumentException("user is active");
        } else {
            user.setVerificationCode(null);
            user.setActive(true);
            userRepository.save(user);
        }

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
                .avatar(user.getAvatar())
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

    // customer
    public UserResponse getUserByEmail() {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmailAndActiveTrue(email).orElseThrow(() -> new IllegalArgumentException("Not found user from id"));
        int quantityOrder = orderRepository.findAllByUsersId(user.getId()).size();
        List<Orders> ordersList = orderRepository.findAllByUsersId(user.getId());

        return UserResponse.builder()
                .idUser(user.getId())
                .full_name(user.getFullName())
                .email(user.getEmail())
                .create_by(user.getCreatedBy())
                .modify_date(user.getModifiedDate())
                .quantityOrders(quantityOrder)
                .password(user.getPassword())
                .avatar(user.getAvatar())
                .orderResponseList(ordersList.stream().map(e -> OrderResponse.builder()
                        .id(e.getId())
                        .status(e.getStatus())
                        .createDate(e.getCreatedDate())
                        .subtotal(e.getPrice())
                        .build()).collect(Collectors.toList()))
                .build();

    }

    public void updateUser(String userRequest, MultipartFile file){
        UpdateUserRequest userReq= JsonUtil.toObject(userRequest,UpdateUserRequest.class);

        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmailAndActiveTrue(email).orElseThrow(() -> new IllegalArgumentException("Not found user from id"));
        Users userApp = userRepository.findByEmailAndActiveTrue(userReq.getEmail()).orElse(null);

        if(userReq.getFullName()!=null){
            user.setFullName(userReq.getFullName());

        }
        if(userReq.getEmail()!=null){
            if (userApp != null&&userApp.getId()!=user.getId()) {
                throw new IllegalArgumentException("Email already exits");
            }
            else{
                user.setEmail(userReq.getEmail());

            }
        }
        if(userReq.getNewPassword()!=null&&userReq.getOldPassword()!=null){
            if(passwordEncoder.matches(userReq.getOldPassword(),user.getPassword())){
                user.setPassword(passwordEncoder.encode(userReq.getNewPassword()));
            }
            else {
                throw new IllegalArgumentException("Password is incorrect");
            }
        }

        if(file != null){
            user.setAvatar(amazonUtil.uploadFile(file));
        }

        userRepository.saveAndFlush(user);
    }

    private void sendVerificationEmail(Users user)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "shoesapp2022@gmail.com";
        String senderName = "Shoes Shop";
        String subject = "Please verify your registration";
        String content = "Dear [[name]],<br>"
                + "Please click the link below to verify your registration:<br>"
                + "<h3><a href=\"[[http://localhost:3000/]]\" target=\"_self\">VERIFY</a></h3>"
                + "Thank you,<br>"
                + "Shoes Shop.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullName());
        String verifyURL = "http://localhost:3000/verify?code=" + user.getVerificationCode();

        content = content.replace("[[http://localhost:3000/]]", verifyURL);

        helper.setText(content, true);

        mailSender.send(message);

        System.out.println("Email has been sent");
    }
}
