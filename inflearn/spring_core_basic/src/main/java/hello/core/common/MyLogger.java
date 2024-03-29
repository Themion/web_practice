package hello.core.common;

import java.util.UUID;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;

@Component
@Scope(value = "request", proxyMode = ScopedProxyMode.TARGET_CLASS)
public class MyLogger {
  private String uuid;
  private String requestURL;

  public void setRequestURL(String requestURL) {
    this.requestURL = requestURL;
  }

  public void log(String message) {
    System.out.println("[" + this.uuid + "]" + "[" + this.requestURL + "]" + message);
  }

  @PostConstruct
  public void init() {
    this.uuid = UUID.randomUUID().toString();
    System.out.println("[" + this.uuid + "] request scope bean create: " + this);
  }

  @PreDestroy
  public void destroy() {
    System.out.println("[" + this.uuid + "] request scope bean close: " + this);
  }
}
