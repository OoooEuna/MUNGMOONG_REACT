package com.mypet.mungmoong.board.api;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.board.dto.Board;
import com.mypet.mungmoong.board.service.BoardService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/board")
public class BoardApiController {

    @Autowired
    private BoardService boardService;

    
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Board> boardList = boardService.list(null, null);
            return new ResponseEntity<>(boardList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    // @GetMapping("/{id}")
    // public ResponseEntity<?> getOne(@PathVariable Integer id) {
    //     try {
    //         //TODO Implement Your Logic To Get Data From Service Layer Or Directly From Repository Layer
    //         return new ResponseEntity<>("GetOne Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    
    // @PostMapping()
    // public ResponseEntity<?> create(@RequestBody Dto dto) {
    //     try {
    //         //TODO Implement Your Logic To Save Data And Return Result Through ResponseEntity
    //         return new ResponseEntity<>("Create Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    
    // @PutMapping()
    // public ResponseEntity<?> update(@RequestBody Dto dto) {
    //     try {
    //         //TODO Implement Your Logic To Update Data And Return Result Through ResponseEntity
    //         return new ResponseEntity<>("Update Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    
    // @DeleteMapping("/{id}")
    // public ResponseEntity<?> destroy(@PathVariable Integer id) {
    //     try {
    //         //TODO Implement Your Logic To Destroy Data And Return Result Through ResponseEntity
    //         return new ResponseEntity<>("Destroy Result", HttpStatus.OK);
    //     } catch (Exception e) {
    //         return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
    
}
