package hello.springmvc.basic.request;

import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpMethod;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/headers")
public class RequestHeaderController {

  @GetMapping
  public String headers(
      HttpServletRequest req,
      HttpServletResponse res,
      HttpMethod httpMethod,
      Locale locale,
      @RequestHeader MultiValueMap<String, String> headerMap,
      @RequestHeader("host") String host,
      @CookieValue(value = "myCookie", required = false) String cookie) {
    log.info("request={}", req);
    log.info("response={}", res);
    log.info("HttpMethod={}", httpMethod);
    log.info("locale={}", locale);
    log.info("headerMap={}", headerMap);
    log.info("header host={}", host);
    log.info("cookie={}", cookie);
    return "ok";
  }
}
