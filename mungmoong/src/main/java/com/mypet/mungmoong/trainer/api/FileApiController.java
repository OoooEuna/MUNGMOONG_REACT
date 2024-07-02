package com.mypet.mungmoong.trainer.api;

import java.io.File;
import java.net.URLEncoder;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.trainer.dto.Files;
import com.mypet.mungmoong.trainer.service.FileService;

import lombok.extern.slf4j.Slf4j;


@Slf4j
@RestController
@RequestMapping("/api/file")
public class FileApiController {
    
    @Autowired
    private FileService fileService;

    @Value("${upload.path}") // application.properties 에 미리 설정한 업로드 경로 가져옴
    private String uploadPath; // upload.path=C:/upload

    /**
     * 파일 다운로드
     * @param no
     * @param response
     * @throws Exception
     */
    @GetMapping("/{no}")
    public ResponseEntity<byte[]> fileDownload(@PathVariable("no") int no) throws Exception {
        Files downloadFile = fileService.download(no);        
        
        // 파일이 없을 때
        if (downloadFile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String fileName = downloadFile.getFileName(); // 파일 이름
        String filePath = downloadFile.getFilePath(); // 파일 경로

        File file = new File(filePath);
        if (!file.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        byte[] fileData = FileCopyUtils.copyToByteArray(file);

        fileName = URLEncoder.encode(fileName, "UTF-8");
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", fileName);

        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }

    /**
     * 파일 삭제
     * @param no
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{no}")
    public ResponseEntity<String> deleteFile(@PathVariable("no") int no) throws Exception {
        log.info("[DELETE] - /file/" + no);

        // 파일 삭제 요청
        int result = fileService.delete(no);

        // ✅ 삭제 성공
        if (result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }

        // ❌ 삭제 실패
        return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 이미지 썸네일
     * @param param
     * @return
     * @throws Exception 
     */
    @GetMapping("/img/{no}")
    public ResponseEntity<byte[]> thumbnailImg(@PathVariable("no") int no) throws Exception {
        // 파일 번호로 파일 정보 조회
        Files file = fileService.select(no);

        // NULL 체크
        if (file == null) {
            String filePath = uploadPath + "/no-image.png"; // 실제 no-img 파일의 형식과 맞춰주기
            File noImageFile = new File(filePath);
            if (!noImageFile.exists()) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
            byte[] noImageFileData = FileCopyUtils.copyToByteArray(noImageFile);
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.IMAGE_JPEG);
            return new ResponseEntity<>(noImageFileData, headers, HttpStatus.OK);
        }

        // 파일 정보 중에서 파일 경로 가져오기
        String filePath = file.getFilePath();
        File f = new File(filePath);

        if (!f.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.IMAGE_JPEG); // 확장자 JPG

        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }
}
