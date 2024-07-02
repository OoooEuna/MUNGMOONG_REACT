package com.mypet.mungmoong.QnA.api;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mypet.mungmoong.QnA.dto.QnA;
import com.mypet.mungmoong.QnA.service.QnAService;
import com.mypet.mungmoong.board.dto.Reply;
import com.mypet.mungmoong.board.service.ReplyService;
import com.mypet.mungmoong.trainer.dto.Option;
import com.mypet.mungmoong.trainer.dto.Page;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/qna")
public class QnAApiController {

    @Autowired
    private QnAService qnaService;

    @Autowired
    private ReplyService replyService;

    @GetMapping("/list")
    public ResponseEntity<?> list(Page page, Option option) throws Exception {
        List<QnA> qnaList = qnaService.list(page, option);
        log.info("문의 리스트 : " + qnaList);
        log.info("page : " + page);

        List<Option> optionList = new ArrayList<>();
        optionList.add(new Option("전체", 0));
        optionList.add(new Option("제목", 1));
        optionList.add(new Option("내용", 2));
        optionList.add(new Option("제목+내용", 3));
        optionList.add(new Option("작성자", 4));

        return ResponseEntity.ok()
                             .header("page", String.valueOf(page))
                             .body(new Object[]{qnaList, optionList});
    }

    @GetMapping("/read")
    public ResponseEntity<?> read(@RequestParam("no") int no) throws Exception {
        QnA qna = qnaService.select(no);
        return ResponseEntity.ok(qna);
    }

    @GetMapping("/insert")
    public ResponseEntity<String> insertForm() {
        return ResponseEntity.ok("Insert form displayed");
    }

    @PostMapping("/insert")
    public ResponseEntity<?> insertPro(@RequestBody QnA qna) throws Exception {
        int result = qnaService.insert(qna);
        if (result > 0) {
            return ResponseEntity.status(201).body("QnA inserted successfully");
        } else {
            return ResponseEntity.status(500).body("Error inserting QnA");
        }
    }

    @GetMapping("/update")
    public ResponseEntity<?> updateForm(@RequestParam("no") int no) throws Exception {
        QnA qna = qnaService.select(no);
        return ResponseEntity.ok(qna);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePro(@RequestBody QnA qna) throws Exception {
        int result = qnaService.update(qna);
        if (result > 0) {
            return ResponseEntity.ok("QnA updated successfully");
        } else {
            return ResponseEntity.status(500).body("Error updating QnA");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> delete(@RequestParam("no") int no) throws Exception {
        int result = qnaService.delete(no);
        if (result > 0) {
            return ResponseEntity.ok("QnA deleted successfully");
        } else {
            return ResponseEntity.status(500).body("Error deleting QnA");
        }
    }

    @GetMapping("/reply")
    public ResponseEntity<?> replylist(Reply reply) throws Exception {
        log.info(":::::::::: 댓글목록 ::::::::::");
        List<Reply> replyList = replyService.listByParent(reply);
        log.info(": " + replyList);
        return ResponseEntity.ok(replyList);
    }

    @PostMapping("/reply")
    public ResponseEntity<String> replyInsert(@RequestBody Reply reply, HttpSession session) throws Exception {
        log.info(":::::::::: 댓글입력 ::::::::::");
        log.info(reply.toString());
        reply.setParentTable("qna");
        int result = replyService.insert(reply);
        if (result > 0) {
            return ResponseEntity.ok("SUCCESS");
        } else {
            return ResponseEntity.status(500).body("FAILURE");
        }
    }
}
