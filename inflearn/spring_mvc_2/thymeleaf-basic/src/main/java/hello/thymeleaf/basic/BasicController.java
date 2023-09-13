package hello.thymeleaf.basic;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/basic")
public class BasicController {

  @GetMapping("text-basic")
  public String textBasic(Model model) {
    // 자동 문자열 이스케이프
    model.addAttribute("data", "Hello <b>Spring!</b>");
    return "basic/text-basic";
  }
}
