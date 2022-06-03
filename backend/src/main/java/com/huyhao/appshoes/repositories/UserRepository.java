package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.common.AppConstant;
import com.huyhao.appshoes.entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByEmailAndActiveTrueAndRoleCode(String email, String role);
}
