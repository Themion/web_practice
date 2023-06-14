package hello.core.order;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AppConfig;
import hello.core.member.Grade;
import hello.core.member.Member;
import hello.core.member.MemberService;

public class OrderApp {
  public static void main(String[] args) {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);

    MemberService memberService = applicationContext.getBean("memberService", MemberService.class);
    OrderService orderService = applicationContext.getBean("fixOrderService", OrderService.class);

    Member vipMember = new Member(2L, "vipMember", Grade.VIP);

    final String itemName = "apple";
    final int itemPrice = 2000;

    memberService.join(vipMember);
    final Order vipOrder = orderService.createOrder(vipMember.getId(), itemName, itemPrice);

    System.out.println(vipOrder);
  }
}
