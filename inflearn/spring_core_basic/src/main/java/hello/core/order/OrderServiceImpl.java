package hello.core.order;

import hello.core.discount.DiscountPolicy;
import hello.core.member.Member;
import hello.core.member.MemberRepository;

public class OrderServiceImpl implements OrderService {
  private final MemberRepository memberRespository;
  private final DiscountPolicy discountPolicy;

  public OrderServiceImpl(MemberRepository memberRepository, DiscountPolicy discountPolicy) {
    this.memberRespository = memberRepository;
    this.discountPolicy = discountPolicy;
  }

  @Override
  public Order createOrder(Long memberId, String itemName, int itemPrice) {
    Member member = memberRespository.findById(memberId);
    int discountPrice = discountPolicy.discount(member, itemPrice);
    return new Order(memberId, itemName, itemPrice, discountPrice);
  }
}