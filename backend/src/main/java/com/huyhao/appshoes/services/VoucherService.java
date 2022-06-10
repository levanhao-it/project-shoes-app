package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.Voucher;
import com.huyhao.appshoes.payload.voucher.VoucherRequest;
import com.huyhao.appshoes.payload.voucher.VoucherResponse;
import com.huyhao.appshoes.repositories.VoucherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class VoucherService {
    private final VoucherRepository voucherRepository;


    public void createVoucher(VoucherRequest voucherRequest) {
        Voucher checkVoucher = voucherRepository.findByCodeAndActiveTrue(voucherRequest.getCode()).orElse(null);

        if(checkVoucher != null){
            throw new IllegalArgumentException("Voucher already exist");
        }

        Voucher voucher = Voucher.builder()
                .name(voucherRequest.getName())
                .code(voucherRequest.getCode())
                .priceConditional(voucherRequest.getPriceCondition())
                .discount(voucherRequest.getDiscount())
                .quantity(voucherRequest.getQuantity())
                .active(true)
                .build();

        voucherRepository.save(voucher);
    }

    public void updateVoucher(Long idVoucher, VoucherRequest voucherRequest) {
        Voucher voucher = voucherRepository.findByIdAndActiveTrue(idVoucher)
                .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherId"));

        String name = voucherRequest.getName();
        if(name != null && name.length() > 0 && !name.equals(voucher.getName())){
            voucher.setName(name);
        }

        boolean checkCode = voucherRepository.existsByCodeAndActiveTrue(voucherRequest.getCode());
        if(checkCode){
            throw new IllegalArgumentException("Code already exists");
        }else {
            voucher.setCode(voucherRequest.getCode());
        }

        Double priceCondition = voucherRequest.getPriceCondition();
        if(priceCondition != null && priceCondition > 0 && !priceCondition.equals(voucher.getPriceConditional())){
            voucher.setPriceConditional(priceCondition);
        }

        Double discount = voucherRequest.getDiscount();
        if(discount != null && discount > 0 && !discount.equals(voucher.getDiscount())){
            voucher.setDiscount(discount);
        }

        Integer quantity = voucherRequest.getQuantity();
        if(quantity != null && quantity > 0 && !quantity.equals(voucher.getQuantity())){
            voucher.setQuantity(quantity);
        }
        voucherRepository.save(voucher);
    }


    public void deleteVoucher(Long idVoucher) {
        Voucher voucher = voucherRepository.findByIdAndActiveTrue(idVoucher)
                .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherId"));

        voucher.setActive(false);
        voucherRepository.save(voucher);
    }

    public List<VoucherResponse> getVoucherList() {
        List<Voucher> voucherList = voucherRepository.findAllByActiveTrue();

        List<VoucherResponse> voucherResponses = voucherList.stream().map(e -> VoucherResponse.builder()
                .id(e.getId())
                        .name(e.getName())
                        .code(e.getCode())
                        .priceCondition(e.getPriceConditional())
                        .discount(e.getDiscount())
                        .quantity(e.getQuantity())
                        .build()
                ).collect(Collectors.toList());

        return voucherResponses;

    }

    public VoucherResponse getVoucherByCode(String code) {
        Voucher voucher = voucherRepository.findByCodeAndActiveTrue(code)
                .orElseThrow(() -> new IllegalArgumentException("Not found voucher from code"));

        return VoucherResponse.builder()
                .id(voucher.getId())
                .name(voucher.getName())
                .code(voucher.getCode())
                .priceCondition(voucher.getPriceConditional())
                .discount(voucher.getDiscount())
                .quantity(voucher.getQuantity())
                .build();
    }
}
