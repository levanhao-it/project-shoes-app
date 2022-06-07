package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Color;
import com.huyhao.appshoes.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color, Long> {

}
