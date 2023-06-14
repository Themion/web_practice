package hello.core;

import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;
import hello.core.member.MemberRepository;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;
import hello.core.member.MemoryMemberRepository;
import hello.core.order.OrderService;
import hello.core.order.OrderServiceImpl;

public class AppConfig {
  
  public DiscountPolicy fixDiscountPolicy() {
    return new FixDiscountPolicy();
  }

  public DiscountPolicy rateDiscountPolicy() {
    return new RateDiscountPolicy();
  }

  public MemberRepository memoryMemberRepository() {
    return new MemoryMemberRepository();
  }
  
  public MemberService memberService() {
    MemberRepository memberRepository = memoryMemberRepository();
    return new MemberServiceImpl(memberRepository);
  }

  public OrderService orderService(DiscountPolicy discountPolicy) {
    MemberRepository memberRepository = memoryMemberRepository();
    return new OrderServiceImpl(memberRepository, discountPolicy);
  }
}
