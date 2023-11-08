package hello.login.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import hello.login.domain.member.Member;
import hello.login.web.session.SessionManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequiredArgsConstructor
public class HomeController {

    private final SessionManager sessionManager;

    // @GetMapping("/")
    public String home() {
        return "home";
    }

    @GetMapping("/")
    public String homeLogin(HttpServletRequest req, Model model) {
        Member member = (Member) sessionManager.getSession(req);

        if (member == null)
            return "home";

        model.addAttribute("member", member);
        return "loginHome";
    }
}
