package hello.core.discount;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import hello.core.member.Grade;
import hello.core.member.Member;

public class RateDiscountPolicyTest {
  DiscountPolicy rateDiscountPolicy = new RateDiscountPolicy();

  @Test
  @DisplayName("VIP는 10% 할인이 적용되어야 한다")
  void vip_discount() {
    // given
    Member vipMember = new Member(1L, "VIP", Grade.VIP);

    // when
    int discountPrice = rateDiscountPolicy.discount(vipMember, 10000);

    // then
    Assertions.assertThat(discountPrice).isEqualTo(1000);
  }

  @Test
  @DisplayName("VIP가 아니면 할인이 적용되지 않아야 한다")
  void basic_discount() {
    // given
    Member basicMember = new Member(1L, "VIP", Grade.BASIC);

    // when
    int discountPrice = rateDiscountPolicy.discount(basicMember, 10000);

    // then
    Assertions.assertThat(discountPrice).isEqualTo(0L);
  }
}
