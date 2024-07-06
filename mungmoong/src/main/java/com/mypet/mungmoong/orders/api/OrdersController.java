package com.mypet.mungmoong.orders.api;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.orders.dto.Orders;
import com.mypet.mungmoong.orders.service.OrdersService;
import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.pet.service.PetService;
import com.mypet.mungmoong.trainer.dto.Trainer;
import com.mypet.mungmoong.trainer.service.TrainerService;
import com.mypet.mungmoong.users.dto.CustomUser;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.service.UsersService;

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

    @Autowired
    private UsersService usersService;

    @Autowired
    private TrainerService trainerService;

    @Autowired
    private PetService petService;

/*
 * 결제준비
 */

@PostMapping("")
public ResponseEntity<?> orders(@RequestBody Orders order
                               ,@AuthenticationPrincipal CustomUser customUser) throws ParseException {

    log.info("::::: customUser1212:::::");
    log.info("customUser : "+ customUser);
    // log.info("date - 예약일자 (문자열) : " + order.getDate());
    // SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
    // order.setResDate( formatter.parse( order.getDate() ) );

    log.info("resDate - 예약일자 : " + order.getResDate());
    log.info("address - 주소 : " + order.getAddress());
    log.info("memo - 요청사항 : " + order.getMemo());
    log.info("productId - 상품ID : " + order.getProductId());
    try {
        Users user = (Users) customUser.getUser();
        order.setUserId(user.getUserId());
        int result = ordersService.insert(order);
        //List<Orders> orderList = ordersService.list();
        if( result > 0 )
            log.info("등록된 orderNo : " + order.getNo());
        return new ResponseEntity<>(order, HttpStatus.OK);
        
    } catch (Exception e) {
        log.info(e.toString());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
/**
 * 
 * 
 * 결제화면
 * @param no
 * @return
 */
@GetMapping("/{orderNo}")
public ResponseEntity<?> orderPay(@PathVariable("orderNo") int orderNo) {
    try {
        log.info("orderNo : " + orderNo);
        Orders order = ordersService.select(orderNo);
        log.info("order : " + order);

        log.info("::::::::::::::: 주문자 정보 (users) ::::::::::::");
        String userId = order.getUserId();
        Users user = usersService.select(userId);
        order.setUser(user);
        log.info(user.toString());

        log.info("::::::::::::::: 훈련사 정보 (trainer) ::::::::::::");
        int trainerNo = order.getTrainerNo();
        Trainer trainer = trainerService.selectByNo(trainerNo);

        String trainerUserId = trainer.getUserId();
        Users trainerUser = usersService.select(trainerUserId);
        trainer.setUser(trainerUser);
        log.info(trainer.toString());
        log.info(trainerUser.toString());
        // 펫 리스트 조회
        List<Pet> petList = petService.findPetByUserId(user.getUserId());
        log.info("petList : " + petList);

         Map<String, Object> response = new HashMap<>();
         response.put("petList", petList);
         response.put("user", user);
         response.put("trainer", trainer);
         response.put("order", order);
         return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        log.info("::::::::::::::::::::::::::::::: error ::::::::::::::::::::::::::::::");
        log.info(e.toString());
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
 /**
 * 
 * 결제성공처리
 * @param no
 * @return
 */
@GetMapping("/success")
public ResponseEntity<?> orderSuccess(Orders order) {
    log.info("::::::::::::::::::::: 결제 성공 ::::::::::::::::::::::::::");
    log.info("order : " + order);
    try {
        int orderNo = order.getNo();
        int petNo = order.getPetNo();
        String status = "paid";         // 결제완료
        order = ordersService.select(orderNo);
        order.setPetNo(petNo);
        order.setStatus(status);
        int result = ordersService.update(order);
        if( result > 0 ) {
            log.info("결제 성공 후 주문 데이터 수정 성공!");
        }
         return new ResponseEntity<>(result, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
/*
*결제 성공 화면
 */
@GetMapping("/success/{orderNo}")
public ResponseEntity<?> getMethodName(@PathVariable("orderNo") int orderNo) {
    try {
        Orders order = ordersService.select(orderNo);
        Map<String, Object> response = new HashMap<>();
            response.put("order", order);
        return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
   }
}
/**
 * 
 * 결제실패화면
 * @param orders
 * @return
 */
@PostMapping("/fail")
public ResponseEntity<?> create(@RequestParam("no") int no) {
    log.info("::::::::::::::::::::: 결제 실패 ::::::::::::::::::::::::::");
    try {
        Map<String, Object> response = new HashMap<>();
        response.put("no", no);
    return new ResponseEntity<>(response, HttpStatus.OK);
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

