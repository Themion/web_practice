package hello.core.order;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AutoAppConfig;
import hello.core.discount.DiscountPolicy;
import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberRepository;

public class OrderServiceImplTest {
  @Test
  void createOrder() {
    ApplicationContext ac = new AnnotationConfigApplicationContext(AutoAppConfig.class);

    MemberRepository memberRepository = ac.getBean(MemberRepository.class);

    Member member = new Member(1L, "member", Grade.VIP);
    memberRepository.save(member);

    DiscountPolicy discountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);
    OrderService orderService = new OrderServiceImpl(memberRepository, discountPolicy);

    Order order = orderService.createOrder(member.getId(), "item", 10000);
    Assertions.assertThat(order.getDiscountPrice()).isEqualTo(1000);

    ((ConfigurableApplicationContext) ac).close();
  }
}
