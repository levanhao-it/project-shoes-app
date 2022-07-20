package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.OptionalDelivery;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface OptionalDeliveryRepository extends JpaRepository<OptionalDelivery, Long> {
    List<OptionalDelivery> findByActiveTrue();

    Optional<OptionalDelivery> findByIdAndActiveTrue(Long id);
}
