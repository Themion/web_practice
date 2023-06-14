package hello.core.order;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;
import hello.core.member.MemberServiceImpl;

public class OrderServiceTest {
  MemberService memberService = new MemberServiceImpl();
  OrderService orderService = new OrderServiceImpl();

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
