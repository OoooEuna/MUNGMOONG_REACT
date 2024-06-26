package com.mypet.mungmoong.imgfile.controller;

import java.io.File;
import java.io.IOException;
import java.sql.Timestamp;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mypet.mungmoong.imgfile.dto.ImgFileDTO;
import com.mypet.mungmoong.imgfile.service.ImgFileService;

@RestController
@RequestMapping("/api/users")
public class ImgFileController {

    private final ImgFileService imgFileService;

    @Autowired
    public ImgFileController(ImgFileService imgFileService) {
        this.imgFileService = imgFileService;
    }

    @GetMapping("/uploadForm")
    public ResponseEntity<String> showUploadForm() {
        return ResponseEntity.ok("Upload form displayed");
    }

    @PostMapping("/uploadImage")
    public ResponseEntity<?> uploadImage(@RequestParam("image") MultipartFile file) {
        if (!file.isEmpty()) {
            String uploadDir = "src/main/resources/static/img/users/";
            String fileName = file.getOriginalFilename();
            File saveFile = new File(uploadDir + fileName);

            try {
                file.transferTo(saveFile);

                ImgFileDTO imgFileDTO = new ImgFileDTO();
                imgFileDTO.setParentNo(0); // 예: 실제 부모 ID로 변경 필요
                imgFileDTO.setParentTable("user_profile");
                imgFileDTO.setFileName(fileName);
                imgFileDTO.setFilePath("/img/users/" + fileName);
                imgFileDTO.setFileSize(file.getSize());
                imgFileDTO.setFileCode("0"); // 예: 코드 값 설정 필요
                imgFileDTO.setRegDate(new Timestamp(System.currentTimeMillis()));
                imgFileDTO.setUpdDate(new Timestamp(System.currentTimeMillis()));

                imgFileService.saveFile(imgFileDTO);

                Map<String, Object> response = new HashMap<>();
                response.put("message", "파일 업로드 성공");
                response.put("imgFile", imgFileDTO);

                return ResponseEntity.ok(response);
            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("파일 업로드 실패: " + e.getMessage());
            }
        } else {
            return ResponseEntity.badRequest().body("업로드할 파일을 선택하세요");
        }
    }
}
