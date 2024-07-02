// package com.mypet.mungmoong.admin.api;
// 
// import java.util.List;
// 
// import javax.servlet.http.HttpSession;
// 
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.DeleteMapping;
// import org.springframework.web.bind.annotation.GetMapping;
// import org.springframework.web.bind.annotation.PathVariable;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.PutMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;
// 
// import com.mypet.mungmoong.QnA.dto.QnA;
// import com.mypet.mungmoong.QnA.service.QnAService;
// import com.mypet.mungmoong.board.dto.Board;
// import com.mypet.mungmoong.board.service.BoardService;
// import com.mypet.mungmoong.orders.dto.Orders;
// import com.mypet.mungmoong.orders.dto.Products;
// import com.mypet.mungmoong.orders.service.OrdersService;
// import com.mypet.mungmoong.orders.service.ProductsService;
// import com.mypet.mungmoong.pet.dto.Pet;
// import com.mypet.mungmoong.pet.service.PetService;
// import com.mypet.mungmoong.trainer.dto.Page;
// import com.mypet.mungmoong.trainer.dto.Trainer;
// import com.mypet.mungmoong.trainer.service.TrainerService;
// import com.mypet.mungmoong.users.dto.Users;
// import com.mypet.mungmoong.users.service.UsersService;
// 
// import lombok.extern.slf4j.Slf4j;
// 
// @Slf4j
// @RestController
// @CrossOrigin(origins = "*")
// @RequestMapping("/api/admin")
// public class AdminApiController {
// 
//     @Autowired
//     private UsersService userService;
// 
//     @Autowired
//     private PetService petService;
// 
//     @Autowired
//     private TrainerService trainerService;
// 
//     @Autowired
//     private BoardService boardService;
// 
//     @Autowired
//     private OrdersService ordersService;
// 
//     @Autowired
//     private ProductsService productsService;
// 
//     @Autowired
//     private QnAService qnaService;
// 
//     @GetMapping("/admin_info")
//     public ResponseEntity<?> list(Page page, Option option) {
//         log.info("이건 들와 지겠지");
//         try {
//             List<Users> usersList = userService.list(page, option);
//             log.info("Users page 로그 : " + page);
//             return new ResponseEntity<>(usersList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_info_read/{userId}")
//     public ResponseEntity<?> read(@PathVariable("userId") String userId) {
//         try {
//             Users users = userService.select(userId);
//             return new ResponseEntity<>(users, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PutMapping("/admin_info_read_update")
//     public ResponseEntity<?> updatePro(@RequestBody Users user) {
//         try {
//             int result = userService.update(user);
//             if (result > 0) {
//                 return new ResponseEntity<>("Update Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_info_read_pet")
//     public ResponseEntity<?> readPet(HttpSession session) {
//         try {
//             Users loginUser = (Users) session.getAttribute("user");
//             if (loginUser == null) {
//                 return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
//             }
//             String userId = loginUser.getUserId();
//             List<Pet> petList = petService.findPetByUserId(userId);
//             return new ResponseEntity<>(petList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @DeleteMapping("/delete/{userId}")
//     public ResponseEntity<?> delete(@PathVariable("userId") String userId) {
//         try {
//             log.info("userId : " + userId);
//             int result = userService.delete(userId);
//             if (result > 0) {
//                 return new ResponseEntity<>("Delete Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_trainer")
//     public ResponseEntity<?> trainerList(Page page, Option option) {
//         try {
//             List<Trainer> trainerList = trainerService.adminTrainerList(page, option);
//             log.info("트레이너 " + trainerList.toString());
//             return new ResponseEntity<>(trainerList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_trainer_read/{userId}")
//     public ResponseEntity<?> select(@PathVariable("userId") String userId) {
//         try {
//             Trainer trainer = trainerService.select(userId);
//             return new ResponseEntity<>(trainer, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_board")
//     public ResponseEntity<?> getBoardList(Page page, Option option) {
//         try {
//             List<Board> boardList = boardService.list(page, option);
//             log.info("Board page 로그 : " + page);
//             return new ResponseEntity<>(boardList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_board_notice")
//     public ResponseEntity<?> getBoardNotice(Page page, Option option) {
//         try {
//             List<QnA> qnaList = qnaService.list(page, option);
//             log.info("QnA page 로그 : " + page);
//             return new ResponseEntity<>(qnaList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_board_read/{no}")
//     public ResponseEntity<?> getBoardDetail(@PathVariable("no") int no) {
//         try {
//             Board board = boardService.select(no);
//             log.info("보드 : " + board.toString());
//             return new ResponseEntity<>(board, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PutMapping("/admin_board_read_update")
//     public ResponseEntity<?> updateBoard(@RequestBody Board board) {
//         try {
//             int result = boardService.update(board);
//             log.info("result : " + result);
//             if (result > 0) {
//                 return new ResponseEntity<>("Update Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @DeleteMapping("/BoardDelete/{no}")
//     public ResponseEntity<?> deleteBoard(@PathVariable("no") int no) {
//         try {
//             log.info("no : " + no);
//             int result = boardService.BoardDelete(no);
//             if (result > 0) {
//                 return new ResponseEntity<>("Delete Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_reserve")
//     public ResponseEntity<?> getReserveList() {
//         try {
//             List<Orders> ordersList = ordersService.list();
//             return new ResponseEntity<>(ordersList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_reserve_pay")
//     public ResponseEntity<?> getReservePayList() {
//         try {
//             List<Orders> ordersList = ordersService.list();
//             return new ResponseEntity<>(ordersList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PostMapping("/admin_trainer_role")
//     public ResponseEntity<?> approveTrainerRole(@RequestBody Users user, @RequestBody Trainer trainer) {
//         try {
//             int result = userService.roleUp(user);
//             if (result > 0) {
//                 return new ResponseEntity<>("Role Update Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_product")
//     public ResponseEntity<?> getProductList() {
//         try {
//             List<Products> productsList = productsService.list();
//             return new ResponseEntity<>(productsList, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @GetMapping("/admin_product_read/{id}")
//     public ResponseEntity<?> getProductDetail(@PathVariable("id") String id) {
//         try {
//             Products products = productsService.select(id);
//             return new ResponseEntity<>(products, HttpStatus.OK);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PostMapping("/admin_product_insert")
//     public ResponseEntity<?> insertProduct(@RequestBody Products products) {
//         try {
//             int result = productsService.adminInsert(products);
//             if (result > 0) {
//                 return new ResponseEntity<>("Insert Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PutMapping("/admin_product_update")
//     public ResponseEntity<?> updateProduct(@RequestBody Products products) {
//         try {
//             int result = productsService.adminUpdate(products);
//             if (result > 0) {
//                 return new ResponseEntity<>("Update Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @DeleteMapping("/admin_product_delete/{id}")
//     public ResponseEntity<?> deleteProduct(@PathVariable("id") String id) {
//         try {
//             int result = productsService.adminDelete(id);
//             if (result > 0) {
//                 return new ResponseEntity<>("Delete Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// 
//     @PostMapping("/admin_orders_status")
//     public ResponseEntity<?> updateOrderStatus(@RequestBody Orders orders) {
//         try {
//             int result = ordersService.Status(orders);
//             if (result > 0) {
//                 return new ResponseEntity<>("Status Update Success", HttpStatus.OK);
//             }
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         } catch (Exception e) {
//             return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//         }
//     }
// }
