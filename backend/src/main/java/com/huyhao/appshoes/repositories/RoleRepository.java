package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long> {
    Role findByCode(String code);
}
