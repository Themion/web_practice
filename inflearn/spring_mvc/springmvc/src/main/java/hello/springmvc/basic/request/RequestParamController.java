package hello.springmvc.basic.request;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import hello.springmvc.basic.HelloData;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
public class RequestParamController {
  @RequestMapping("/request-param-v1")
  public void requestParamV1(HttpServletRequest req, HttpServletResponse res) throws IOException {
    String username = req.getParameter("username");
    int age = Integer.parseInt(req.getParameter("age"));

    log.info("username={} age={}", username, age);

    res.getWriter().write("ok");
  }

  @ResponseBody
  @RequestMapping("/request-param-v2")
  public String requestParamV2(
      @RequestParam("username") String memberName,
      @RequestParam("age") int memberAge) {
    log.info("username: {}, age: {}", memberName, memberAge);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/request-param-v3")
  public String requestParamV3(
      @RequestParam String username,
      @RequestParam int age) {
    log.info("username: {}, age: {}", username, age);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/request-param-v4")
  public String requestParamV4(String username, int age) {
    log.info("username: {}, age: {}", username, age);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/request-param-required")
  public String requestParamRequired(
      @RequestParam(required = true) String username,
      @RequestParam(required = false) Integer age) {
    log.info("username: {}, age: {}", username, age);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/request-param-default")
  public String requestParamDefault(
      @RequestParam(defaultValue = "default") String username,
      @RequestParam(defaultValue = "-1") Integer age) {
    log.info("username: {}, age: {}", username, age);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/request-param-map")
  public String requestParamMap(@RequestParam Map<String, Object> paramMap) {
    Object username = paramMap.get("username");
    Object age = paramMap.get("age");
    log.info("username: {}, age: {}", username, age);
    return "ok";
  }

  @ResponseBody
  @RequestMapping("/model-attribute-v1")
  public String modelAttributeV1(@RequestParam String username, @RequestParam int age) {
    HelloData helloData = new HelloData();
    helloData.setAge(age);
    helloData.setUsername(username);

    log.info("username: {}, age: {}", helloData.getUsername(), helloData.getAge());
    log.info("helloData: {}", helloData);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/model-attribute-v2")
  public String modelAttributeV2(@ModelAttribute HelloData helloData) {
    log.info("helloData: {}", helloData);

    return "ok";
  }

  @ResponseBody
  @RequestMapping("/model-attribute-v3")
  public String modelAttributeV3(HelloData helloData) {
    log.info("helloData: {}", helloData);

    return "ok";
  }
}
