package hello.core;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

@Configuration
public class AppConfig {

  @Bean
  public DiscountPolicy fixDiscountPolicy() {
    return new FixDiscountPolicy();
  }

  @Bean
  public DiscountPolicy rateDiscountPolicy() {
    return new RateDiscountPolicy();
  }

  @Bean
  public MemberRepository memoryMemberRepository() {
    return new MemoryMemberRepository();
  }
  
  @Bean
  public MemberService memberService() {
    MemberRepository memberRepository = memoryMemberRepository();
    return new MemberServiceImpl(memberRepository);
  }

  public OrderService orderService(DiscountPolicy discountPolicy) {
    MemberRepository memberRepository = memoryMemberRepository();
    return new OrderServiceImpl(memberRepository, discountPolicy);
  }

  @Bean
  public OrderService fixOrderService() {
    DiscountPolicy fixDiscountPolicy = fixDiscountPolicy();
    return orderService(fixDiscountPolicy);
  }

  @Bean
  public OrderService rateOrderService() {
    DiscountPolicy rateDiscountPolicy = rateDiscountPolicy();
    return orderService(rateDiscountPolicy);
  }
}
