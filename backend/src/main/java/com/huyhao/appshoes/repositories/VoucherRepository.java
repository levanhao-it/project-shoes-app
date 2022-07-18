package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.Voucher;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VoucherRepository extends JpaRepository<Voucher, Long> {
    Optional<Voucher> findByCodeAndActiveTrue(String code);

    Optional<Voucher> findByIdAndActiveTrue(Long id);

    Boolean existsByCodeAndActiveTrue(String code);

    List<Voucher> findAllByActiveTrue();

    List<Voucher> findAllByActiveTrueAndStatusTrue();

}
