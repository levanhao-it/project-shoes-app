package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.order.*;
import com.huyhao.appshoes.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderService {
    private final UserRepository userRepository;
    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final AddressDeliveryRepository addressDeliveryRepository;
    private final VoucherRepository voucherRepository;

    private final ProductDetailRepository productDetailRepository;

    public void createOrder(OrderRequest request) {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        AddressDelivery addressDelivery = addressDeliveryRepository.findById(request.getAddressDeliveryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressID"));

        Voucher voucher;

        if (request.getVoucherCode() != null){
            voucher = voucherRepository.findByCodeAndActiveTrue(request.getVoucherCode())
                    .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucher.setStatus((voucher.getQuantity() - 1) != 0 );
            voucherRepository.save(voucher);
        }else{
            voucher = voucherRepository.findByCodeAndActiveTrue("NO_VOUCHER")
                    .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));
        }

        Orders orders = Orders.builder()
                .users(user)
                .addressDelivery(addressDelivery)
                .message(request.getMessage())
                .status("Đang xử lí")
                .voucher(voucher)
                .build();

        orderRepository.save(orders);

        for (OrderDetailRequest c : request.getOrderDetailRequestList()
        ) {
            ProductDetail productDetail = productDetailRepository.findByIdAndActiveTrue(c.getProductDetailId())
                    .orElseThrow(() -> new IllegalArgumentException("Not found product from product detail"));
            if(productDetail.getQuantity() - c.getQuantity() == 0){
                productDetail.setQuantity(0);
                productDetail.setStatus(false);
            }else{
                productDetail.setQuantity(productDetail.getQuantity() - c.getQuantity());
            }
            productDetailRepository.save(productDetail);

            OrderDetail orderDetail = OrderDetail.builder()
                    .productDetail(productDetail)
                    .quantity(c.getQuantity())
                    .orders(orders)
                    .build();
            orderDetailRepository.save(orderDetail);
        }

    }



    public List<OrderResponse> getOrderListInCustomer(String  email) {

        Users user = userRepository.findByEmailAndActiveTrue(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from idUser"));

        List<Orders> ordersList = orderRepository.findAllByUsersId(user.getId());

        List<OrderResponse> orderResponseList = new ArrayList<>();

        for (Orders o : ordersList
        ) {
            List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrdersId(o.getId());

            List<OrderItemResponse> orderDetailResponseList = orderDetailList.stream().map(e->OrderItemResponse.builder()
                    .id(e.getId())
                    .nameProduct(e.getProductDetail().getProduct().getName())
                    .salePrice(e.getProductDetail().getSalePrice())
                    .color(e.getProductDetail().getColor().getName())
                    .size(e.getProductDetail().getSize().getName())
                    .quantity(e.getQuantity())
                    .image(e.getProductDetail().getImageLink())
                    .build()).collect(Collectors.toList());

            int quantityITem = 0;
            long total = 0;

            for(OrderItemResponse i : orderDetailResponseList){
                quantityITem += i.getQuantity();
                total += i.getQuantity() * i.getSalePrice();
            }

            OrderResponse response = OrderResponse
                    .builder()
                    .id(o.getId())
                    .email(user.getEmail())
                    .quantityItem(quantityITem)
                    .total(total)
                    .subtotal(total - o.getVoucher().getDiscount())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();
            orderResponseList.add(response);
        }

        return orderResponseList;
    }

    public OrderResponse getOrder(Long orderId) {
        Orders orders = orderRepository.findById(orderId)
                .orElseThrow(() -> new IllegalArgumentException("Not found order from order id"));

            List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrdersId(orderId);

            List<OrderItemResponse> orderDetailResponseList = orderDetailList.stream().map(e -> OrderItemResponse.builder()
                    .id(e.getId())
                    .nameProduct(e.getProductDetail().getProduct().getName())
                    .salePrice(e.getProductDetail().getSalePrice())
                    .color(e.getProductDetail().getColor().getName())
                    .size(e.getProductDetail().getSize().getName())
                    .quantity(e.getQuantity())
                    .image(e.getProductDetail().getImageLink())
                    .build()).collect(Collectors.toList());

        int quantityITem = 0;
        long total = 0;

        for(OrderItemResponse i : orderDetailResponseList){
            quantityITem += i.getQuantity();
            total += i.getQuantity() * i.getSalePrice();
        }

            OrderResponse response = OrderResponse
                    .builder()
                    .id(orders.getId())
                    .email(orders.getUsers().getEmail())
                    .quantityItem(quantityITem)
                    .total(total)
                    .subtotal(total - orders.getVoucher().getDiscount())
                    .feeVoucher(orders.getVoucher().getDiscount())
                    .createDate(orders.getCreatedDate())
                    .status(orders.getStatus())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();

            return response;


    }

    public List<OrderResponse> getOrderListInAdmin() {
        List<Orders> ordersList = orderRepository.findAll();
        List<OrderResponse> orderResponseList = new ArrayList<>();

        for (Orders o : ordersList
        ) {
            List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrdersId(o.getId());

            List<OrderItemResponse> orderDetailResponseList = orderDetailList.stream().map(e->OrderItemResponse.builder()
                    .id(e.getId())
                    .nameProduct(e.getProductDetail().getProduct().getName())
                    .salePrice(e.getProductDetail().getSalePrice())
                    .color(e.getProductDetail().getColor().getName())
                    .size(e.getProductDetail().getSize().getName())
                    .quantity(e.getQuantity())
                    .image(e.getProductDetail().getImageLink())
                    .build()).collect(Collectors.toList());

            int quantityITem = 0;
            long total = 0;

            for(OrderItemResponse i : orderDetailResponseList){
                quantityITem += i.getQuantity();
                total += i.getQuantity() * i.getSalePrice();
            }


            OrderResponse response = OrderResponse
                    .builder()
                    .id(o.getId())
                    .email(o.getUsers().getEmail())
                    .quantityItem(quantityITem)
                    .total(total)
                    .subtotal(total - o.getVoucher().getDiscount())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();
            orderResponseList.add(response);
        }
        return orderResponseList;
    }

    public void updateOrderById(Long idOrder, StatusOrderRequest request){
        Orders orders=orderRepository.findById(idOrder).orElseThrow(()-> new IllegalArgumentException("Not found idOrder"));
        orders.setStatus(request.getStatus());
        orderRepository.save(orders);
    }

}

