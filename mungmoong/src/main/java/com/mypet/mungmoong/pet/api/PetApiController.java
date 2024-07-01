package com.mypet.mungmoong.pet.api;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.pet.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/pets")
public class PetApiController {

    private static final Logger logger = LoggerFactory.getLogger(PetApiController.class);

    @Autowired
    private PetService petService;

    // ################################################################ 펫 수정 ################################################################

    @GetMapping("/update")
    public ResponseEntity<?> showUpdatePetForm(@RequestParam(name = "petNo", required = true) Integer petNo, HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        logger.info("Received request for petNo: {}", petNo);
        logger.info("userId from session: {}", userId);
        session.getAttributeNames().asIterator().forEachRemaining(name -> logger.info("Session attribute: {} = {}", name, session.getAttribute(name)));

        if (petNo == null) {
            logger.error("Missing petNo parameter");
            return ResponseEntity.badRequest().body("Missing petNo parameter");
        }

        Pet pet = petService.findPetById(petNo);
        if (pet == null || !pet.getUserId().equals(userId)) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found or user not authorized");
        }
        return ResponseEntity.ok(pet);
    }

    @PostMapping("/update")
    public ResponseEntity<?> updatePet(@RequestParam("petNo") int petNo,
                                       @RequestParam("petname") String petname,
                                       @RequestParam("age") int age,
                                       @RequestParam("petgender") int petgender,
                                       @RequestParam("character") String character,
                                       @RequestParam("type") String type,
                                       @RequestParam("specialNotes") String specialNotes,
                                       @RequestPart(value = "upload-photo", required = false) MultipartFile file,
                                       HttpSession session) {

        String userId = (String) session.getAttribute("userId");
        logger.info("Updating pet: userId={}, petNo={}", userId, petNo);

        Pet pet = petService.findPetById(petNo);
        if (pet == null || !pet.getUserId().equals(userId)) {
            logger.warn("Pet not found or user not authorized");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pet not found or user not authorized");
        }

        pet.setPetname(petname);
        pet.setAge(age);
        pet.setPetgender(petgender);
        pet.setCharacter(character);
        pet.setType(type);
        pet.setSpecialNotes(specialNotes);
        pet.setUpdDate(new Date());

        // 파일 업로드 처리 (주석 해제 필요 시 사용)
        // if (file != null && !file.isEmpty()) {
        //     logger.info("File received: {}", file.getOriginalFilename());
        //     try {
        //         String fileName = file.getOriginalFilename();
        //         String filePath = "/path/to/upload/directory/" + fileName;
        //         File dest = new File(filePath);
        //         file.transferTo(dest);
        //
        //         // DB에 파일 정보 저장
        //         ImgFileDTO imgFileDTO = new ImgFileDTO();
        //         imgFileDTO.setParentNo(petNo);
        //         imgFileDTO.setParentTable("pet");
        //         imgFileDTO.setFileName(fileName);
        //         imgFileDTO.setFilePath(filePath);
        //         imgFileDTO.setFileSize(file.getSize());
        //         imgFileDTO.setRegDate(new Timestamp(System.currentTimeMillis()));
        //         imgFileDTO.setUpdDate(new Timestamp(System.currentTimeMillis()));
        //         imgFileService.saveFile(imgFileDTO);
        //     } catch (IOException e) {
        //         logger.error("File upload error: ", e);
        //     }
        // }

        petService.updatePet(pet);

        // 갱신된 펫 목록을 세션에 업데이트
        List<Pet> pets = petService.findPetByUserId(userId);
        session.setAttribute("pets", pets);

        return ResponseEntity.ok(pet);
    }

    // ################################################################ 펫 추가 ################################################################

    @GetMapping("/add")
    public ResponseEntity<?> showAddPetForm(HttpSession session) {
        String userId = (String) session.getAttribute("userId");
        logger.info("showAddPetForm called, session userId: {}", userId);
        if (userId == null) {
            logger.warn("User ID is null");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }
        return ResponseEntity.ok(userId);
    }

    @PostMapping("/add")
    public ResponseEntity<?> insertPet(@RequestParam("petname") String petname,
                                       @RequestParam("age") int age,
                                       @RequestParam("petgender") int petgender,
                                       @RequestParam("character") String character,
                                       @RequestParam("type") String type,
                                       @RequestParam("specialNotes") String specialNotes,
                                       HttpSession session) {

        String userId = (String) session.getAttribute("userId");
        logger.info("insertPet called, session userId: {}", userId);
        if (userId == null) {
            logger.warn("User not logged in");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
        }

        Pet pet = new Pet();
        pet.setUserId(userId); // 현재 사용자 ID 설정
        pet.setPetname(petname);
        pet.setAge(age);
        pet.setPetgender(petgender);
        pet.setCharacter(character);
        pet.setType(type);
        pet.setSpecialNotes(specialNotes); // 특이사항 추가함

        // 현재 시간을 설정
        pet.setRegDate(new Date());
        pet.setUpdDate(new Date());

        petService.insertPet(pet);

        // 갱신된 펫 목록을 세션에 업데이트
        List<Pet> pets = petService.findPetByUserId(userId);
        session.setAttribute("pets", pets);

        return ResponseEntity.status(HttpStatus.CREATED).body(pet);
    }

    // ################################################################ 펫 삭제 ################################################################

    @DeleteMapping("/delete")
    public ResponseEntity<?> deletePet(@RequestBody Map<String, Object> payload, HttpSession session) {
        try {
            Integer petNo = (Integer) payload.get("petNo");
            if (petNo == null) {
                return ResponseEntity.badRequest().body("Invalid pet number");
            }

            String userId = (String) session.getAttribute("userId");
            if (userId == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not logged in");
            }

            // Debugging logs
            System.out.println("Deleting pet: userId=" + userId + ", petNo=" + petNo);

            Pet pet = petService.findPetById(petNo);
            if (pet == null || !pet.getUserId().equals(userId)) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Pet not found or user not authorized");
            }

            petService.deletePet(petNo);

            // 갱신된 펫 목록을 세션에 업데이트
            List<Pet> updatedPets = petService.findPetByUserId(userId);
            session.setAttribute("pets", updatedPets);

            // 갱신된 펫 목록 반환
            return ResponseEntity.ok(updatedPets);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error deleting pet");
        }
    }
}
