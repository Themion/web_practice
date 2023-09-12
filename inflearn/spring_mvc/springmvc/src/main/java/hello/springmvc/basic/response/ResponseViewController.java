package hello.springmvc.basic.response;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class ResponseViewController {
  @RequestMapping("/response-view-v1")
  public ModelAndView responseViewV1() {
    ModelAndView mav = new ModelAndView("response/hello")
        .addObject("data", "hello!");
    return mav;
  }

  @RequestMapping("/response-view-v2")
  public String responseViewV2(Model model) {
    model.addAttribute("data", "hello!!");
    return "response/hello";
  }

  // HTTP response를 처리하는 로직이 없을 때에만 view template 사용
  @RequestMapping("/response/hello")
  public void responseViewV3(Model model) {
    model.addAttribute("data", "hello!!!");
  }
}
