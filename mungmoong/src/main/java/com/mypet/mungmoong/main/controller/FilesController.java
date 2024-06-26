package com.mypet.mungmoong.main.controller;

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

import com.mypet.mungmoong.main.model.Files;
import com.mypet.mungmoong.main.service.FilesService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/files")
public class FilesController {

    @Autowired
    private FilesService filesService;

    @Value("${upload.path}")
    private String uploadPath;

    /**
     * 파일 다운로드
     * @param id
     * @param response
     * @throws Exception
     */
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> fileDownload(@PathVariable("id") String id) throws Exception {
        Files downloadFile = filesService.select(id);

        // 파일이 없으면,
        if (downloadFile == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        String fileName = downloadFile.getName(); // 파일 이름
        String filePath = downloadFile.getPath(); // 파일 경로

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
     * @param id
     * @return
     * @throws Exception
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteFile(@PathVariable("id") String id) throws Exception {
        log.info("[DELETE] - /files/" + id);

        // 파일 삭제 요청
        int result = filesService.delete(id);

        // ✅ 삭제 성공
        if (result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        }

        // ❌ 삭제 실패
        return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
    }

    /**
     * 이미지 썸네일
     * @param id
     * @return
     * @throws Exception
     */
    @GetMapping("/img/{id}")
    public ResponseEntity<byte[]> thumbnailImg(@PathVariable("id") String id) throws Exception {
        // 파일 번호로 파일 정보 조회
        Files file = filesService.select(id);

        // Null 체크
        if (file == null) {
            String filePath = uploadPath + "/no-image.png";
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
        String filePath = file.getPath();
        String fileName = file.getName();
        String ext = fileName.substring(fileName.lastIndexOf('.') + 1);

        // 파일 객체 생성
        File f = new File(filePath);
        if (!f.exists()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }

        // 파일 데이터
        byte[] fileData = FileCopyUtils.copyToByteArray(f);

        // 이미지 컨텐츠 타입 지정
        HttpHeaders headers = new HttpHeaders();
        // MediaType mediaType = MediaUtil.getMediaType(ext);
        // headers.setContentType(mediaType);        

        return new ResponseEntity<>(fileData, headers, HttpStatus.OK);
    }
}
