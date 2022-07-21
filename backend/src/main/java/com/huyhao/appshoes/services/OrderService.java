package com.huyhao.appshoes.services;

import com.huyhao.appshoes.entity.*;
import com.huyhao.appshoes.payload.order.*;
import com.huyhao.appshoes.repositories.*;
import lombok.RequiredArgsConstructor;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
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

    private final OptionalDeliveryRepository optionalDeliveryRepository;
    public final JavaMailSender mailSender;


    public OrderResponse createOrder(OrderRequest request) throws MessagingException, UnsupportedEncodingException {

        Users user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("Not found user from email"));

        AddressDelivery addressDelivery = addressDeliveryRepository.findById(request.getAddressDeliveryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found address from addressID"));

        OptionalDelivery optionalDelivery = optionalDeliveryRepository.findByIdAndActiveTrue(request.getOptionalDeliveryId())
                .orElseThrow(() -> new IllegalArgumentException("Not found optional delivery from id"));

        Voucher voucher;

        if (!request.getVoucherCode().equals("NO_VOUCHER")){
            voucher = voucherRepository.findByCodeAndActiveTrue(request.getVoucherCode())
                    .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));
            voucher.setQuantity(voucher.getQuantity() - 1);
            voucher.setStatus(voucher.getQuantity()  != 0 );
            voucherRepository.save(voucher);
        }else{
            voucher = voucherRepository.findByCodeAndActiveTrue("NO_VOUCHER")
                    .orElseThrow(() -> new IllegalArgumentException("Not found voucher from voucherCode"));
        }

        Orders orders = Orders.builder()
                .users(user)
                .addressDelivery(addressDelivery)
                .status("Đang xử lí")
                .voucher(voucher)
                .optionDelivery(optionalDelivery)
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
        sendEmailConfirmOrder(user,orders.getId());
        return getOrder(orders.getId());
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
                    .subtotal(total)
                    .total(total - o.getVoucher().getDiscount())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .nameOptionalDelivery(o.getOptionDelivery().getName())
                    .orderItemResponseList(orderDetailResponseList)
                    .nameDelivery(o.getAddressDelivery().getFullName())
                    .addressDelivery(o.getAddressDelivery().getAddress())
                    .phoneDelivery(o.getAddressDelivery().getPhoneNumber())
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
                    .subtotal(total)
                    .total(total - orders.getVoucher().getDiscount())
                    .feeVoucher(orders.getVoucher().getDiscount())
                    .createDate(orders.getCreatedDate())
                    .status(orders.getStatus())
                    .nameOptionalDelivery(orders.getOptionDelivery().getName())
                    .orderItemResponseList(orderDetailResponseList)
                    .nameDelivery(orders.getAddressDelivery().getFullName())
                    .addressDelivery(orders.getAddressDelivery().getAddress())
                    .phoneDelivery(orders.getAddressDelivery().getPhoneNumber())
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
                    .subtotal(total)
                    .total(total - o.getVoucher().getDiscount())
                    .feeVoucher(o.getVoucher().getDiscount())
                    .createDate(o.getCreatedDate())
                    .status(o.getStatus())
                    .nameOptionalDelivery(o.getOptionDelivery().getName())
                    .orderItemResponseList(orderDetailResponseList)
                    .nameDelivery(o.getAddressDelivery().getFullName())
                    .addressDelivery(o.getAddressDelivery().getAddress())
                    .phoneDelivery(o.getAddressDelivery().getPhoneNumber())
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

    private void sendEmailConfirmOrder(Users user,Long idOrder)
            throws MessagingException, UnsupportedEncodingException {
        String toAddress = user.getEmail();
        String fromAddress = "shoesapp2022@gmail.com";
        String senderName = "Shoes Shop";
        String subject = "Order Confirmation ";
        String content = "Dear [[name]],"
                + "<h3><a href=\"[[URL]]\" target=\"_self\">Tình trạng đơn hàng</a></h3>"
                + "Thank you,<br>"
                + "Shoes Shop.";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom(fromAddress, senderName);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        content = content.replace("[[name]]", user.getFullName());
        String checkoutURL = "http://localhost:3000/checkout/" + idOrder;

        content = content.replace("[[URL]]", checkoutURL);

        helper.setText(content, true);

        mailSender.send(message);

        System.out.println("Email has been sent");
    }
}

