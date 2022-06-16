package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Role;
import com.huyhao.appshoes.payload.role.RoleRequest;
import com.huyhao.appshoes.payload.role.RoleResponse;
import com.huyhao.appshoes.repositories.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {

    private final RoleRepository roleRepository;

    public void createRole(RoleRequest roleRequest){
        Role existRole = roleRepository.findByCode(roleRequest.getCode());

        if (existRole != null){
            throw new IllegalArgumentException("Role already exist");
        }

        Role role = Role.builder()
                .name(roleRequest.getName())
                .code(roleRequest.getCode())
                .build();

        roleRepository.save(role);

    }

}
