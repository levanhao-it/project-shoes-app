package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Color;
import com.huyhao.appshoes.payload.color.ColorRequest;
import com.huyhao.appshoes.payload.color.ColorResponse;
import com.huyhao.appshoes.repositories.ColorRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ColorService {
    private final ColorRepository colorRepository;

    public List<ColorResponse> getColorList() {
        List<Color> colors = colorRepository.findByActiveTrue();
        return colors.stream().map(e -> ColorResponse.builder()
                .id(e.getId())
                .name(e.getName())
                .code(e.getCode())
                .build())
                .collect(Collectors.toList());
    }

    public ColorResponse getColorById(Long id){
        Color color = colorRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new IllegalArgumentException("Not found color from color id"));

        return ColorResponse.builder()
                .id(color.getId())
                .name(color.getName())
                .code(color.getCode())
                .build();
    }

    public void creteColor(ColorRequest colorRequest) {
        boolean existColor = colorRepository.existsColorByCodeAndActiveTrue(colorRequest.getCode());

        if(existColor){
            throw new IllegalArgumentException("Code of color has already");
        }
        Color color = Color.builder()
                .name(colorRequest.getName())
                .code(colorRequest.getCode())
                .active(true)
                .build();

        colorRepository.save(color);
    }

    public void updateColor(Long colorId, ColorRequest colorRequest) {
        Color color = colorRepository.findByIdAndActiveTrue(colorId)
                .orElseThrow(() -> new IllegalArgumentException("Not found color from color id"));
        boolean existCode = colorRepository.existsColorByCodeAndActiveTrue(colorRequest.getCode());
        if(existCode){
            throw new IllegalArgumentException("Code of color has already");
        }

        if(colorRequest.getCode() != null && colorRequest.getCode().length() > 0){
            color.setCode(colorRequest.getCode());
        }

        if(colorRequest.getName() != null && colorRequest.getName().length() > 0){
            color.setName(colorRequest.getName());
        }

        colorRepository.save(color);
    }

    public void deleteColor(Long colorId) {
        Color color = colorRepository.findByIdAndActiveTrue(colorId)
                .orElseThrow(() -> new IllegalArgumentException("Not found color from color id"));
        color.setActive(false);
        colorRepository.save(color);
    }
}
