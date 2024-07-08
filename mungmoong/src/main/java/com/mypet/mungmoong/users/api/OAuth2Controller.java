package com.mypet.mungmoong.users.api;



import com.mypet.mungmoong.users.service.OAuth2Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@Slf4j
@RestController
@RequestMapping("/api/oauth2")
public class OAuth2Controller {

    @Autowired
    private OAuth2Service oAuth2Service;

    @GetMapping("/callback/{platform}")
    public void handleOAuth2Callback(@PathVariable String platform,
                                     @RequestParam(required = false) String code,
                                     HttpServletResponse response) {
        try {
            if (code == null || code.isEmpty()) {
                throw new IllegalArgumentException("Missing 'code' parameter");
            }

            // OAuth2 인증 코드로 토큰을 교환하고 JWT 생성
            String jwtToken = oAuth2Service.exchangeCodeForToken(code, platform);

            // JWT를 클라이언트의 로컬 스토리지에 저장하기 위해 HTML 페이지로 반환
            response.setContentType("text/html");
            response.getWriter().write(
                "<html><body>" +
                "<script>" +
                "localStorage.setItem('jwtToken', '" + jwtToken + "');" +
                "window.location.href = 'http://localhost:3000/';" + // 클라이언트 페이지로 리디렉션
                "</script>" +
                "</body></html>"
            );
        } catch (Exception e) {
            log.error("OAuth2 인증 실패", e);
            try {
                response.sendRedirect("http://localhost:3000/error"); // 에러 페이지로 리디렉션
            } catch (IOException ioException) {
                log.error("리디렉션 실패", ioException);
            }
        }
    }
}
