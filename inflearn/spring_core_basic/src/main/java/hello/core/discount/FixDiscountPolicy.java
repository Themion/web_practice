package hello.core.discount;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import hello.core.member.Grade;
import hello.core.member.Member;

@Component("fixDiscountPolicy")
@Qualifier("fixDiscountPolicy")
// @Qualifier("fiixDiscountPolicy")
public class FixDiscountPolicy implements DiscountPolicy {

  private final int discountFixAmount = 1000;

  @Override
  public int discount(Member member, int price) {
    if (member.getGrade() == Grade.VIP) return discountFixAmount;
    return 0; 
  }
  
}
