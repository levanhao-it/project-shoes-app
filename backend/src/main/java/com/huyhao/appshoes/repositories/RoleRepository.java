package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {

    Role findByCode(String code);

}
