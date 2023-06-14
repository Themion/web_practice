package hello.core.discount;

import hello.core.member.Member;

public interface DiscountPolicy {
  /**
   * @param member 할인받을 고객
   * @param price 할인할 가격
   * @return 할인 대상 금액
   */
  int discount(Member member, int price);
}