package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Product;
import com.huyhao.appshoes.entity.Size;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface SizeRepository extends JpaRepository<Size, Long> {

}
