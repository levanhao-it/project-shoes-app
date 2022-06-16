package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Size;
import com.huyhao.appshoes.payload.size.SizeResponse;
import com.huyhao.appshoes.payload.size.SizeRequest;
import com.huyhao.appshoes.repositories.SizeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SizeService {
    private final SizeRepository sizeRepository;

    public List<SizeResponse> getSizeList() {
        List<Size> colors = sizeRepository.findByActiveTrue();
        return colors.stream().map(e -> SizeResponse.builder()
                .id(e.getId())
                .name(e.getName())

                .build())
                .collect(Collectors.toList());
    }

    public SizeResponse getSizeById(Long id){
        Size size = sizeRepository.findByIdAndActiveTrue(id)
                .orElseThrow(() -> new IllegalArgumentException("Not found size from size id"));

        return SizeResponse.builder()
                .id(size.getId())
                .name(size.getName())
                .build();
    }

    public void creteSize(String name) {
        boolean existSize = sizeRepository.existsSizeByNameAndActiveTrue(name);

        if(existSize){
            throw new IllegalArgumentException("Name of size has already");
        }
        Size size = Size.builder()
                .name(name)
                .active(true)
                .build();

        sizeRepository.save(size);
    }

    public void updateSize(Long sizeId, String name) {
        Size size = sizeRepository.findByIdAndActiveTrue(sizeId)
                .orElseThrow(() -> new IllegalArgumentException("Not found size from size id"));
        boolean exitsName = sizeRepository.existsSizeByNameAndActiveTrue(name);
        if(exitsName){
            throw new IllegalArgumentException("Name of size has already");
        }

        if(name != null && name.length() > 0){
            size.setName(name);
        }
        sizeRepository.save(size);
    }

    public void deleteSize(Long colorId) {
        Size size = sizeRepository.findByIdAndActiveTrue(colorId)
                .orElseThrow(() -> new IllegalArgumentException("Not found size from size id"));
        size.setActive(false);
        sizeRepository.save(size);
    }
}
