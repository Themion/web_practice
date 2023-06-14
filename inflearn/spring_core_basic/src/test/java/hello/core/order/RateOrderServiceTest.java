package hello.core.order;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import hello.core.AppConfig;
import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;

public class RateOrderServiceTest {
  AppConfig appConfig;
  MemberService memberService;
  OrderService orderService;

  @BeforeEach
  public void beforeEach() {
    appConfig = new AppConfig();

    memberService = appConfig.memberService();
    orderService = appConfig.rateOrderService();
  }

  @Test
  void createRateBasicOrder() {
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
  void createRateVipOrder() {
    // given
    Member vipMember = new Member(2L, "vipMember", Grade.VIP);

    final String itemName = "apple";
    final int itemPrice = 2000;

    // when
    memberService.join(vipMember);
    final Order vipOrder = orderService.createOrder(vipMember.getId(), itemName, itemPrice);

    // then
    Assertions.assertThat(vipOrder.calculatePrice()).isEqualTo(1800);
  }
}
