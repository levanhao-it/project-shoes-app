package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.order.OrderItemResponse;
import com.huyhao.appshoes.payload.order.OrderRequest;
import com.huyhao.appshoes.payload.order.OrderResponse;
import com.huyhao.appshoes.payload.order.StatusOrderRequest;
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
    private final CartRepository cartRepository;

    public void createOrder(OrderRequest request) {
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        Users user = userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        AddressDelivery addressDelivery = addressDeliveryRepository.findById(request.getAddressDeliveryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressID"));

        Voucher voucher = voucherRepository.findByCodeAndActiveTrue(request.getVoucherCode())
                .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));

        Cart cart = cartRepository.findByUsersId(user.getId())
                .orElseThrow(() -> new IllegalArgumentException("not found cart"));


        List<OrderDetail> orderDetailList = new ArrayList<>();

        Orders orders = Orders.builder()
                .users(user)
                .addressDelivery(addressDelivery)
                .message(request.getMessage())
                .status("Đang xử lí")
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

    public List<OrderResponse> getOrderListInCustomer(Long idUser) {

        Users user = userRepository.findByIdAndActiveTrue(idUser)
                .orElseThrow(() -> new IllegalArgumentException("Not found user from idUser"));

        List<Orders> ordersList = orderRepository.findAllByUsersId(idUser);

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
                    .email(user.getEmail())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .quantityItem(o.getTotalQuantity())
                    .total(o.getPrice())
                    .subtotal(o.getPrice() - o.getVoucher().getDiscount())
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
                    .totalPrice(e.getQuantity() * e.getProductDetail().getSalePrice())
                    .build()).collect(Collectors.toList());

            OrderResponse response = OrderResponse
                    .builder()
                    .id(orders.getId())
                    .email(orders.getUsers().getEmail())
                    .feeVoucher(orders.getVoucher().getDiscount())
                    .quantityItem(orders.getTotalQuantity())
                    .total(orders.getPrice())
                    .subtotal(orders.getPrice() - orders.getVoucher().getDiscount())
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
                    .totalPrice(e.getQuantity() * e.getProductDetail().getSalePrice())
                    .build()).collect(Collectors.toList());

            OrderResponse response = OrderResponse
                    .builder()
                    .id(o.getId())
                    .email(o.getUsers().getEmail())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .quantityItem(o.getTotalQuantity())
                    .total(o.getPrice())
                    .subtotal(o.getPrice() - o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();
            orderResponseList.add(response);
        }
        return orderResponseList;
    }

    public List<OrderResponse> getOrderListByUserInAdmin(Long idUser) {
        List<Orders> ordersList = orderRepository.findAllByUsersId(idUser);
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
                    .email(o.getUsers().getEmail())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .quantityItem(o.getTotalQuantity())
                    .total(o.getPrice())
                    .subtotal(o.getPrice() - o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .orderItemResponseList(orderDetailResponseList)
                    .build();
            orderResponseList.add(response);
        }
        return orderResponseList;
    }

    public OrderResponse getOrderById(Long idOrder) {
        Orders orders = orderRepository.findById(idOrder)
                .orElseThrow(() -> new IllegalArgumentException("Not found orders from user"));

        List<OrderDetail> orderDetailList = orderDetailRepository.findAllByOrdersId(orders.getId());
        return OrderResponse
                .builder()
                .id(orders.getId())
                .feeVoucher(orders.getVoucher().getDiscount())
                .quantityItem(orders.getTotalQuantity())
                .total(orders.getPrice())
                .email(orders.getUsers().getEmail())
                .createDate(orders.getCreatedDate())
                .subtotal(orders.getPrice() - orders.getVoucher().getDiscount())
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

    public void updateOrderById(Long idOrder, StatusOrderRequest request){
        Orders orders=orderRepository.findById(idOrder).orElseThrow(()-> new IllegalArgumentException("Not found idOrder"));
        orders.setStatus(request.getStatus());
        orderRepository.save(orders);
    }

}

