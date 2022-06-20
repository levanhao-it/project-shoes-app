package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.order.OrderItemResponse;
import com.huyhao.appshoes.payload.order.OrderRequest;
import com.huyhao.appshoes.payload.order.OrderResponse;
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
    private final PaymentMethodRepository paymentMethodRepository;
    private final CartRepository cartRepository;

    public void createOrder(OrderRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        AddressDelivery addressDelivery = addressDeliveryRepository.findById(request.getAddressDeliveryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressID"));

        Voucher voucher = voucherRepository.findByCodeAndActiveTrue(request.getVoucherCode())
                .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));

        PaymentMethod paymentMethod = paymentMethodRepository.findById(request.getPaymentMethodId())
                .orElseThrow(() -> new IllegalArgumentException("Not found paymentMethod from payment_method_Id"));

        Cart cart = cartRepository.findByUsersId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("not found cart"));


        List<OrderDetail> orderDetailList = new ArrayList<>();

        Orders orders = Orders.builder()
                .users(user)
                .addressDelivery(addressDelivery)
                .message(request.getMessage())
                .status(request.isStatus())
                .paymentMethod(paymentMethod)
                .voucher(voucher)
                .totalQuantity(cart.getQuantity())
                .price(cart.getPrice())
                .build();
        orderRepository.save(orders);


        List<CartItem> cartItemList = cart.getCartItemList();
        for (CartItem c : cartItemList
        ) {
            OrderDetail orderDetail = OrderDetail.builder()
                    .productDetail(c.getProductDetail())
                    .quantity(c.getQuantity())
                    .orders(orders)
                    .build();
            orderDetailRepository.save(orderDetail);
            orderDetailList.add(orderDetail);
        }
    }

    public OrderResponse getOrderById(Long idOrder) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        Orders orders = orderRepository.findById(idOrder)
                .orElseThrow(() -> new IllegalArgumentException("Not found orders from user"));

        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrdersId(orders.getId());
        return OrderResponse
                .builder()
                .id(orders.getId())
                .feeDelivery(orders.getPaymentMethod().getDiscount())
                .feeVoucher(orders.getVoucher().getDiscount())
                .quantityItem(orders.getTotalQuantity())
                .total(orders.getPrice())
                .createDate(orders.getCreatedDate())
                .subtotal(orders.getPrice() - orders.getPaymentMethod().getDiscount() - orders.getVoucher().getDiscount())
                .orderItemResponseList(orderDetailList.stream().map(e->OrderItemResponse.builder()
                        .id(e.getId())
                        .nameProduct(e.getProductDetail().getProduct().getName())
                        .salePrice(e.getProductDetail().getSalePrice())
                        .color(e.getProductDetail().getColor().getName())
                        .size(e.getProductDetail().getSize().getName())
                        .quantity(e.getQuantity())
                        .totalPrice(e.getQuantity() * e.getProductDetail().getSalePrice())
                        .build()).collect(Collectors.toList()))
                .build();


    }

    public List<OrderResponse> getAllOrderByUser(Long idUser) {
        Users user = userRepository.findByIdAndActiveTrue(idUser)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from id"));


        List<Orders> ordersList = orderRepository.findAllByUsers(user);
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
                    .totalPrice(e.getQuantity() * e.getProductDetail().getSalePrice())
                    .build()).collect(Collectors.toList());

            OrderResponse response = OrderResponse
                    .builder()
                    .id(o.getId())
                    .feeDelivery(o.getPaymentMethod().getDiscount())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .quantityItem(o.getTotalQuantity())
                    .total(o.getPrice())
                    .subtotal(o.getPrice() - o.getPaymentMethod().getDiscount() - o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();
            orderResponseList.add(response);
        }
        return orderResponseList;
    }
}
