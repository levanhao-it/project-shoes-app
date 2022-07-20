package com.huyhao.appshoes.payload.optionalDelivery;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Builder
@Getter
@Setter
public class OptionalDeliveryRequest {
    private String name;
    private String description;
}
