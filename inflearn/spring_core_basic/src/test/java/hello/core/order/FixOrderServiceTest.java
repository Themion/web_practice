package hello.core.order;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import hello.core.AppConfig;
import hello.core.discount.DiscountPolicy;
import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;

public class FixOrderServiceTest {
  AppConfig appConfig;
  MemberService memberService;
  OrderService orderService;

  @BeforeEach
  public void beforeEach() {
    appConfig = new AppConfig();

    memberService = appConfig.memberService();
    DiscountPolicy fixDiscountPolicy = appConfig.fixDiscountPolicy();
    orderService = appConfig.orderService(fixDiscountPolicy);
  }

  @Test
  void createBasicOrder() {
    // given
    Member basicMember = new Member(1L, "basicMember", Grade.BASIC);

    final String itemName = "apple";
    final int itemPrice = 2000;

    // when
    memberService.join(basicMember);
    final Order basicOrder = orderService.createOrder(basicMember.getId(), itemName, itemPrice);

    // then
    Assertions.assertThat(basicOrder.calculatePrice()).isEqualTo(itemPrice);
  }

  @Test
  void createVipOrder() {
    // given
    Member vipMember = new Member(2L, "vipMember", Grade.VIP);

    final String itemName = "apple";
    final int itemPrice = 2000;

    // when
    memberService.join(vipMember);
    final Order vipOrder = orderService.createOrder(vipMember.getId(), itemName, itemPrice);

    // then
    Assertions.assertThat(vipOrder.calculatePrice()).isEqualTo(itemPrice - 1000);
  }
}
