package com.huyhao.appshoes.controller.customer;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.order.OrderRequest;
import com.huyhao.appshoes.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @PostMapping()
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request){
        try {

            return ResponseEntity.ok(ResponseCommon.success(orderService.createOrder(request)));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @GetMapping("/{orderId}")
    public ResponseEntity<?> getOrderById(@PathVariable Long orderId){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getOrder(orderId)));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }


    @GetMapping("")
    public ResponseEntity<?> getOrderList(@RequestParam String email){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getOrderListInCustomer(email)));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }






}
