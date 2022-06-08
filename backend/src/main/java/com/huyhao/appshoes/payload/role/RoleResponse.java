package com.huyhao.appshoes.payload.role;

import com.huyhao.appshoes.entity.Users;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class RoleResponse {
    private String code;
    private String name;
    private List<Users> usersList;
}
