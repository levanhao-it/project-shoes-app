package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.OptionalDelivery;
import com.huyhao.appshoes.payload.optionalDelivery.OptionalDeliveryRequest;
import com.huyhao.appshoes.payload.optionalDelivery.OptionalDeliveryResponse;
import com.huyhao.appshoes.repositories.OptionalDeliveryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OptionalDeliveryService {
    private final OptionalDeliveryRepository optionalDeliveryRepository;
    public List<OptionalDeliveryResponse>  getOptionalDeliveryList() {
        List<OptionalDelivery> optionalDeliveries = optionalDeliveryRepository.findByActiveTrue();
        return optionalDeliveries.stream().map(e -> OptionalDeliveryResponse.builder()
                        .id(e.getId())
                        .name(e.getName())
                        .description(e.getDescription())
                        .build())
                .collect(Collectors.toList());
    }

    public void createOptionalDelivery(OptionalDeliveryRequest optionalDeliveryRequest) {
        OptionalDelivery optionalDelivery = OptionalDelivery.builder()
                .name(optionalDeliveryRequest.getName())
                .description(optionalDeliveryRequest.getDescription())
                .active(true)
                .build();

        optionalDeliveryRepository.save(optionalDelivery);
    }


    public OptionalDeliveryResponse getOptionalDelivery(Long optionalDeliveryId) {
        OptionalDelivery optionalDelivery = optionalDeliveryRepository.findByIdAndActiveTrue(optionalDeliveryId)
                .orElseThrow(() -> new IllegalArgumentException("Not found optionalDelivery from id"));

        return OptionalDeliveryResponse.builder()
                .id(optionalDelivery.getId())
                .name(optionalDelivery.getName())
                .description(optionalDelivery.getDescription())
                .build();
    }

    public void updateDeliveryOptional(Long optionalDeliveryId, OptionalDeliveryRequest optionalDeliveryRequest) {
        OptionalDelivery optionalDelivery = optionalDeliveryRepository.findByIdAndActiveTrue(optionalDeliveryId)
                .orElseThrow(() -> new IllegalArgumentException("Not found optional delivery from id"));

        if(optionalDeliveryRequest.getName() != null && optionalDeliveryRequest.getName().length() > 0
               ){
            optionalDelivery.setName(optionalDeliveryRequest.getName());
        }

        if(optionalDeliveryRequest.getDescription() != null && optionalDeliveryRequest.getDescription().length() > 0
               ){
            optionalDelivery.setDescription(optionalDeliveryRequest.getDescription());
        }

        optionalDeliveryRepository.save(optionalDelivery);
    }

    public void deleteOptionalDelivery(Long optionalDeliveryId) {
        OptionalDelivery optionalDelivery = optionalDeliveryRepository.findByIdAndActiveTrue(optionalDeliveryId)
                .orElseThrow(() -> new IllegalArgumentException("Not found optional delivery from id"));

        optionalDelivery.setActive(false);
        optionalDeliveryRepository.save(optionalDelivery);
    }
}
