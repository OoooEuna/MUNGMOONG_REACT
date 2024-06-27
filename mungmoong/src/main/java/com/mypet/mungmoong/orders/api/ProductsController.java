package com.mypet.mungmoong.orders.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
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

import com.mypet.mungmoong.board.dto.Board;
import com.mypet.mungmoong.board.dto.Reply;
import com.mypet.mungmoong.board.service.ReplyService;
import com.mypet.mungmoong.orders.dto.Products;
import com.mypet.mungmoong.orders.service.ProductsService;


import lombok.extern.slf4j.Slf4j;





@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/products")
public class ProductsController {

    @Autowired
    private ProductsService productsService;




    
      @InitBinder
    public void initBinder(WebDataBinder binder) {
        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        dateFormat.setLenient(false);
        binder.registerCustomEditor(Date.class, new CustomDateEditor(dateFormat, true));
    }
    
    @GetMapping()
    public ResponseEntity<?> getAll() {
       try {
            List<Products> productList= productsService.list();
            return new ResponseEntity<>(productList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
         } 
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") String id) {
        try {
            Products products = productsService.select(id);
            return new ResponseEntity<>(products, HttpStatus.OK);
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
    public ResponseEntity<?> destroy(@PathVariable("deleteIdList") String deleteIdList) {
        try {
            int result = productsService.delete(deleteIdList);
            if(result > 0)
                return new ResponseEntity<>("Delete Result", HttpStatus.OK);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}












