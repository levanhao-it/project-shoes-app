package com.huyhao.appshoes.repositories;

import com.huyhao.appshoes.entity.AddressDelivery;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AddressDeliveryRepository extends JpaRepository<AddressDelivery, Long> {
    Optional<AddressDelivery> findById(Long aLong);
    Optional<AddressDelivery> findByIdAndUsersIdAndActiveTrue(Long idUser,Long idAddress);
    List<AddressDelivery> findAllByActiveTrueAndUsersId(Long userId);
}
