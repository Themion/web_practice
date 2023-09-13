package hello.thymeleaf.basic;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

  @GetMapping("/basic-objects")
  public String basicObjects(HttpSession session) {
    session.setAttribute("sessionData", "Hello Session");
    return "basic/basic-objects";
  }

  @GetMapping("/date")
  public String date(Model model) {
    model.addAttribute("localDateTime", LocalDateTime.now());
    return "basic/date";
  }

  @GetMapping("link")
  public String link(Model model) {
    model.addAttribute("param1", "data1");
    model.addAttribute("param2", "data2");
    return "basic/link";
  }

  @GetMapping(value = "/literal")
  public String literal(Model model) {
    model.addAttribute("data", "Spring Framework!");
    return "basic/literal";
  }

  @GetMapping(value = "/operation")
  public String getMethodName(Model model) {
    model.addAttribute("nullData", null);
    model.addAttribute("data", "Spring!");
    return "basic/operation";
  }

}
