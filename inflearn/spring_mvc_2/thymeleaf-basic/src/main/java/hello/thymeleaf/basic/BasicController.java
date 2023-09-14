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

@Controller
@RequestMapping("/basic")
public class BasicController {

  private void addUsers(Model model) {
    List<User> list = new ArrayList<>();
    list.add(new User("userA", 10));
    list.add(new User("userB", 20));
    list.add(new User("userC", 30));
    model.addAttribute("users", list);
  }

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
  public String operation(Model model) {
    model.addAttribute("nullData", null);
    model.addAttribute("data", "Spring!");
    return "basic/operation";
  }

  @GetMapping(value = "/attribute")
  public String attribute() {
    return "basic/attribute";
  }

  @GetMapping(value = "/each")
  public String each(Model model) {
    this.addUsers(model);
    return "basic/each";
  }

  @GetMapping(value = "/condition")
  public String condition(Model model) {
    this.addUsers(model);
    return "basic/condition";
  }

}
