package themion7.spring_security.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class SessionController {
    @GetMapping("login")
    public String loginPage() {
        return "login";
    }
    @GetMapping("logout")
    public String logoutPage() {
        return "logout";
    }
}
