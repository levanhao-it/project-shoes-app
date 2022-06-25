package com.huyhao.appshoes.controller.admin;

import com.huyhao.appshoes.common.ResponseCommon;
import com.huyhao.appshoes.payload.common.ErrorResponse;
import com.huyhao.appshoes.payload.order.StatusOrderRequest;
import com.huyhao.appshoes.services.OrderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/orders")
@RequiredArgsConstructor
@Slf4j
public class OrderAdminController {
    private final OrderService orderService;

    @GetMapping("")
    public ResponseEntity<?> getAllOrders(){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getAllOrder()));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }

    @GetMapping("/{idOrder}")
    public ResponseEntity<?> getAllOrders(@PathVariable Long idOrder){
        try {
            return ResponseEntity.ok(ResponseCommon.success(orderService.getOrderById(idOrder)));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }
    @PutMapping("/{idOrder}")
    public ResponseEntity<?> updateOrders(@PathVariable Long idOrder, @RequestBody StatusOrderRequest status){
        try {
            orderService.updateOrderById(idOrder, status);
            return ResponseEntity.ok(ResponseCommon.success(""));
        } catch (Exception ex) {
            log.error("API /api/orders: ", ex);
            return ResponseEntity.badRequest().body(ErrorResponse.builder().message(ex.getMessage()).build());
        }

    }






}
