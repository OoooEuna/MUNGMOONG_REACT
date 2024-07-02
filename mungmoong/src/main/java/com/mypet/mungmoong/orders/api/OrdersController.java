package com.mypet.mungmoong.orders.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.orders.dto.Orders;
import com.mypet.mungmoong.orders.service.OrdersService;
import com.mypet.mungmoong.users.dto.CustomUser;
import com.mypet.mungmoong.users.dto.Users;

import lombok.extern.slf4j.Slf4j;



/**
 * TODO: 전체적으로 권한 설정 및 본인 확인 처리 필요
 */
@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/orders")
public class OrdersController {


    @Autowired
    private OrdersService ordersService;

/*
 * 결제준비
 */

@GetMapping()
public ResponseEntity<?> orders(Orders order
                              ,@AuthenticationPrincipal CustomUser customUser) {
    log.info("::::: customUser :::::");
    log.info("customUser : "+ customUser);
    log.info("resDate - 예약일자 : " + order.getRegDate());
    log.info("address - 주소 : " + order.getAddress());
    log.info("memo - 요청사항 : " + order.getAddress());
    log.info("productId - 상품ID : " + order.getProductId());
    try {
        Users user = (Users) customUser.getAttribute("user");
        order.setUserId(user.getUserId());
        int result = ordersService.insert(order);
        //List<Orders> orderList = ordersService.list();
        if( result > 0 )
            log.info("등록된 orderNo : " + order.getNo());
         return new ResponseEntity<>("GetAll Results", HttpStatus.OK);
        
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@GetMapping("/{no}")
public ResponseEntity<?> getOne(@PathVariable("no") int no) {
    try {
        Orders order = ordersService.select(no);
   return new ResponseEntity<>("GetOne Result", HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@PostMapping()
public ResponseEntity<?> create(@RequestBody Orders orders) {
    try {
        int newOrders = ordersService.insert(orders);
        if(newOrders > 0)
            return new ResponseEntity<>(newOrders, HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@PutMapping()
public ResponseEntity<?> update(@RequestBody Orders orders) {
    try {
        int result = ordersService.update(orders);
        if(result > 0)
            return new ResponseEntity<>("Update Result", HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@DeleteMapping("/{no}")
public ResponseEntity<?> destroy(@PathVariable("no") int no) {
    try {
        int result = ordersService.delete(no);
        if(result > 0)
            return new ResponseEntity<>("Delete Result", HttpStatus.OK);
        else
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
   } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

   
}

