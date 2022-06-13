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
@RequestMapping("/api/order")
@RequiredArgsConstructor
@Slf4j
public class OrderController {
    private final OrderService orderService;

    @PostMapping()
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest request){
        try {
            orderService.createOrder(request);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }
    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<?> getOrderById(@PathVariable Long idOrder){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getOrderById(idOrder)));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @GetMapping("")
    public ResponseEntity<?> getAllOrders(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getAllOrderByUser()));
        } catch (Exception ex) {
            log.error("API /api/rate: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }






}