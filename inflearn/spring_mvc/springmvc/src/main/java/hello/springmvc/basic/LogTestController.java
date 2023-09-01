package hello.springmvc.basic;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class LogTestController {
  // private final Logger log = LoggerFactory.getLogger(getClass());

  @GetMapping("/log-test")
  public String logTest() {
    String name = "name1231";

    // 설정의 log level이 메소드의 log level보다 높다면 메소드는 실행되지 않음
    // parameter를 format 방식으로 넘기면
    // 메소드가 실행되지 않을 때 연산이 일어나지 않아 CPU 등의 자원을 절약
    log.trace("trace log = {}", name);
    log.debug("debug log = {}", name);
    log.info(" info log = {}", name);
    log.warn(" warn log = {}", name);
    log.error("error log = {}", name);

    return "ok";
  }
}
