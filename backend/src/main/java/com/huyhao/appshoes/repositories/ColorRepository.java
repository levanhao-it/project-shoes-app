package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Color;
import com.huyhao.appshoes.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface ColorRepository extends JpaRepository<Color, Long> {
    List<Color> findByActiveTrue();

    Optional<Color> findByIdAndActiveTrue(Long id);

    boolean existsColorByCodeAndActiveTrue(String code);

}
