package hello.springmvc.basic.request;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class RequestParamController {
  @RequestMapping("/request-param-v1")
  public void requestparamV1(HttpServletRequest req, HttpServletResponse res) throws IOException {
    String username = req.getParameter("username");
    int age = Integer.parseInt(req.getParameter("age"));

    log.info("username={} age={}", username, age);

    res.getWriter().write("ok");
  }
}
