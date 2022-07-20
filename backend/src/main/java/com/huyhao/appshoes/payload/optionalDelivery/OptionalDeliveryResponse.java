package com.huyhao.appshoes.payload.optionalDelivery;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class OptionalDeliveryResponse {
    private Long id;
    private String name;
    private String description;
}
