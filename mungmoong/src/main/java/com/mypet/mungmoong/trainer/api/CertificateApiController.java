package com.mypet.mungmoong.trainer.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mypet.mungmoong.trainer.dto.Certificate;
import com.mypet.mungmoong.trainer.dto.Files;
import com.mypet.mungmoong.trainer.service.CertificateService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/certificate")
public class CertificateApiController {

    @Autowired
    private CertificateService certificateService;

    @DeleteMapping("")
    public ResponseEntity<String> deleteCertificate(@RequestParam("no") int certificateNo,
                                                    @RequestParam("fileNo") int fileNo) throws Exception {
        log.info("certificateNo : " + certificateNo);
        log.info("fileNo : " + fileNo);

        Files file = new Files();
        file.setNo(fileNo);

        Certificate certificate = new Certificate();
        certificate.setNo(certificateNo);
        certificate.setImgFile(file);

        int result = certificateService.delete(certificate);
        if (result > 0) {
            return new ResponseEntity<>("SUCCESS", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
