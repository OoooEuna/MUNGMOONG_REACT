package com.mypet.mungmoong.pet.api;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.mypet.mungmoong.pet.dto.Pet;
import com.mypet.mungmoong.pet.service.PetService;
import com.mypet.mungmoong.users.dto.CustomUser;
import com.mypet.mungmoong.users.dto.Users;
import com.mypet.mungmoong.users.service.UsersService;

@RestController
@RequestMapping("/api/pets")
public class PetApiController {

    private static final Logger logger = LoggerFactory.getLogger(PetApiController.class);

    @Autowired
    private PetService petService;

    @Autowired
    private UsersService userService;

    // ############################################### REACT ###############################################
    
    @GetMapping
    public ResponseEntity<List<Pet>> getPets(@AuthenticationPrincipal CustomUser customUser) {
        logger.info("Received request for getPets");

        if (customUser == null) {
            logger.error("CustomUser is null");
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Users user = customUser.getUser();
        logger.info("User ID: {}", user.getUserId());

        List<Pet> pets = petService.findPetByUserId(user.getUserId());
        logger.info("Pets: {}", pets);

        return new ResponseEntity<>(pets, HttpStatus.OK);
    }

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
                                       @RequestParam("petgender") String petgender,
                                       @RequestParam("petcharacter") String petcharacter,
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
        pet.setPetcharacter(petcharacter);
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

   
    @PostMapping("/add")
    public ResponseEntity<?> insertPet(@RequestParam("petname") String petname,
                                       @RequestParam("age") int age,
                                       @RequestParam("petgender") String petgender,
                                       @RequestParam("petcharacter") String petcharacter,
                                       @RequestParam("type") String type,
                                       @RequestParam("specialNotes") String specialNotes,
                                       @RequestParam("userId") String userId) {
        Pet pet = new Pet();
        pet.setUserId(userId);
        pet.setPetname(petname);
        pet.setAge(age);
        pet.setPetgender(petgender);
        pet.setPetcharacter(petcharacter);
        pet.setType(type);
        pet.setSpecialNotes(specialNotes);
        pet.setRegDate(new Date());
        pet.setUpdDate(new Date());
    
        petService.insertPet(pet);
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
