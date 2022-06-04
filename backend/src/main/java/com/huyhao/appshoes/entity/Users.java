package com.huyhao.appshoes.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity
@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class Users extends BaseEntity{
    private String password;
    private String fullName;
    private String email;
    private boolean active;

    @ManyToOne()
    @JoinColumn(name = "role_id", nullable = false)
    private Role role;
}
