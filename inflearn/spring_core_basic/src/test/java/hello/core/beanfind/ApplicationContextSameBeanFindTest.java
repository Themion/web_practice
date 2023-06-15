package hello.core.beanfind;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AppConfig;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class ApplicationContextSameBeanFindTest {
  AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

  @Test
  @DisplayName("타입으로 조회 시 같은 타입이 둘 이상일 경우, 중복 오류 발생")
  void findBeanByTypeDuplicated() {
    assertThrows(
      NoUniqueBeanDefinitionException.class,
      () -> ac.getBean(OrderService.class)
    );
  }

  @Test
  @DisplayName("타입으로 조회 시 같은 타입이 둘 이상일 경우, 빈 이름을 지정")
  void findBeanByNameAndType() {
    OrderService orderService = ac.getBean("fixOrderService", OrderService.class);
    assertThat(orderService).isInstanceOf(OrderServiceImpl.class);
  }

  @Test
  @DisplayName("타입으로 조회 시 같은 타입이 둘 이상일 경우, 모든 빈을 조회")
  void findAllBeanByType() {
    Map<String, OrderService> beansOfType = ac.getBeansOfType(OrderService.class);
    for (String key : beansOfType.keySet()) {
      assertThat(beansOfType.get(key)).isInstanceOf(OrderServiceImpl.class);
    }
    assertThat(beansOfType.size()).isEqualTo(2);
  }
}
