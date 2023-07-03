package hello.core.lifecycle;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

public class BeanLifeCycleTest {

  @Test
  public void lifeCycleTest() {
    ApplicationContext ac = new AnnotationConfigApplicationContext(LifeCycleConfig.class);
    NetworkClient networkClient = ac.getBean(NetworkClient.class);

    ((ConfigurableApplicationContext) ac).close();

  }

  @Configuration
  static class LifeCycleConfig {
    // @Bean(initMethod = "init", destroyMethod = "close")
    @Bean(initMethod = "init")
    public NetworkClient networkClient() {
      NetworkClient networkClient = new NetworkClient();
      networkClient.setUrl("http://hello-spring.dev");
      return networkClient;
    }
  }
}
