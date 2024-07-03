package com.mypet.mungmoong.orders.api;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.board.dto.Reply;
import com.mypet.mungmoong.board.service.ReplyService;
import com.mypet.mungmoong.orders.dto.Products;
import com.mypet.mungmoong.orders.service.ProductsService;
import com.mypet.mungmoong.users.dto.CustomUser;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;

    @Autowired
    private ReplyService replyService;
    
      @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
     /**
     * 상품 목록
     */
    
    @GetMapping("")
    public ResponseEntity<?> getAll() {
       try {
            List<Products> productList= productsService.list();
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         } 
    }
    /**
     * 상품 상세
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id
                                   ,@AuthenticationPrincipal CustomUser customUser) {
        try {
            log.info("::::: customUser :::::");
            log.info("customUser : "+ customUser);
            // Products products = productsService.select(id);
            Products products = productsService.select(id);
            log.info("컨트롤러에서 아이디 : " + id);
            log.info("products : " + products);
            Map<String, Object> response = new HashMap<>();
            response.put("products", products);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       }
    }
    
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Products products) {
        try {
            int newProducts = productsService.insert(products);
            if(newProducts > 0)
                return new ResponseEntity<>(newProducts, HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
       } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
     /**
     * 훈련사 댓글 목록
     */
    @GetMapping("/replys")
    public ResponseEntity<?> getOne(Reply reply
                                ,@AuthenticationPrincipal CustomUser customUser) {
    try {
        log.info("::::: customUser :::::");
        log.info("customUser : " + customUser);
        // 데이터 요청
        List<Reply> replyList = replyService.listByParent(reply); 
        Map<String, Object> response = new HashMap<>();
        response.put("replyList", replyList);
        return new ResponseEntity<>(response, HttpStatus.OK);
    } catch (Exception e) {
        log.error("Error occurred: ", e);  // 추가된 에러 로그
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

    
   /**
     * 댓글 수정
     * @param reply
     * @return
     * @throws Exception
     */
    @PostMapping("/replys")
    public ResponseEntity<String> update(@RequestBody Reply reply
                                         ,@AuthenticationPrincipal CustomUser customUser) throws Exception {
        // 데이터 요청
        log.info(":::::::::: 댓글입력 ::::::::::");
        log.info(reply.toString());
        reply.setParentTable("products");
        int result = replyService.insert(reply);
        if( result > 0 ) {
            // 데이터 처리 성공
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }
        return new ResponseEntity<>("FAIL", HttpStatus.OK);
    } 

    
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Products products) {
        try {
            int result = productsService.update(products);
            if(result > 0)
                return new ResponseEntity<>("Update Result", HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{deleteIdList}")
    public ResponseEntity<?> destroy(String[] deleteIdList
                                     ,@AuthenticationPrincipal CustomUser customUser) {
        try { 
            String ids = Arrays.stream(deleteIdList)
                            .map(s -> "'" + s + "'")
                            .collect(Collectors.joining(","));
                             log.info("ids : " + ids);
                             int result = productsService.delete(ids);
            if(result > 0){
                return new ResponseEntity<>("Delete Result", HttpStatus.OK);
            }
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}












