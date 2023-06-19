package hello.core.scan;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AutoAppConfig;
import hello.core.discount.DiscountPolicy;
import hello.core.member.MemberService;
import hello.core.order.OrderService;

public class AutoAppConfigTest {
  @Test
  void basicScan() {
    ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class);

    MemberService memberService = ac.getBean(MemberService.class);
    OrderService orderService = ac.getBean(OrderService.class);
    DiscountPolicy discountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);

    assertThat(memberService).isInstanceOf(MemberService.class);
    assertThat(orderService).isInstanceOf(OrderService.class);
    assertThat(discountPolicy).isInstanceOf(DiscountPolicy.class);

    ((ConfigurableApplicationContext) ac).close();
  }
}
