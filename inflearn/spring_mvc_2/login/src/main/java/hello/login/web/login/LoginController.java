package hello.login.web.login;

import java.util.Optional;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import hello.login.domain.login.LoginService;
import hello.login.domain.member.Member;
import hello.login.web.session.SessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class LoginController {
    private final LoginService loginService;
    private final SessionManager sessionManager;

    @GetMapping("/login")
    public String loginForm(@ModelAttribute("loginForm") LoginForm form) {
        return "login/loginForm";
    }

    @PostMapping("/login")
    public String login(@Validated @ModelAttribute LoginForm form, BindingResult bindingResult,
            HttpServletResponse res) {
        if (bindingResult.hasErrors())
            return "login/loginForm";

        Optional<Member> loginResult = loginService.login(form.getLoginId(), form.getPassword());
        if (loginResult.isEmpty()) {
            log.info("login failed, form={}", form);
            bindingResult.reject("loginFail", "아이디 혹은 비밀번호가 맞지 않습니다.");
            return "login/loginForm";
        }

        sessionManager.createSeesion(loginResult.get(), res);

        return "redirect:/";
    }

    @PostMapping(value = "/logout")
    public String postMethodName(HttpServletRequest req) {
        sessionManager.expire(req);
        return "redirect:/";
    }

}
