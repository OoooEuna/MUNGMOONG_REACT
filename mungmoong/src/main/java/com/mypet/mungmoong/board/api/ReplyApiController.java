package com.mypet.mungmoong.board.api;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.board.dto.Board;
import com.mypet.mungmoong.board.dto.Reply;
import com.mypet.mungmoong.board.service.ReplyService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/replys")
public class ReplyApiController {

       @Autowired
       private ReplyService replyService;
    
    @GetMapping()
    public ResponseEntity<?> getAll() {
        try {
            List<Reply> replyList = replyService.list();
            return new ResponseEntity<>(replyList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/{boardNo}")
    public ResponseEntity<?> getOne(@PathVariable("boardNo") int boardNo) {
        try {
    // 🎫 게시글
            Reply reply = replyService.select(boardNo);
           // 데이터 요청
            List<Reply> replyList = replyService.listByBoardNo(boardNo);

            Map<String, Object> response = new HashMap<>();
            response.put("replyList", replyList);
           // response.put("fileList", fileList);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PostMapping()
    public ResponseEntity<?> create(@RequestBody Board board) {
        try {
            //TODO Implement Your Logic To Save Data And Return Result Through ResponseEntity
            return new ResponseEntity<>("Create Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @PutMapping()
    public ResponseEntity<?> update(@RequestBody Board board) {
        try {
            //TODO Implement Your Logic To Update Data And Return Result Through ResponseEntity
            return new ResponseEntity<>("Update Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> destroy(@PathVariable Integer id) {
        try {
            //TODO Implement Your Logic To Destroy Data And Return Result Through ResponseEntity
            return new ResponseEntity<>("Destroy Result", HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
