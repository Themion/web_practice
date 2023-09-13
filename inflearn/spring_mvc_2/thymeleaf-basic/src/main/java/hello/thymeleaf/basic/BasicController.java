package hello.thymeleaf.basic;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

  @GetMapping("/variables")
  public String variables(Model model) {
    User userA = new User("userA", 10);
    User userB = new User("userB", 10);

    List<User> list = new ArrayList<>();
    list.add(userA);
    list.add(userB);

    Map<String, User> map = new HashMap<>();
    list.stream().forEach((user) -> map.put(user.getUsername(), user));

    model.addAttribute("user", userA);
    model.addAttribute("users", list);
    model.addAttribute("userMap", map);

    return "basic/variables";
  }
}
