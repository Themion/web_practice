package hello.core.member;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AppConfig;

public class MemberApp {
  public static void main(String[] args) {
    ApplicationContext applicationContext = new AnnotationConfigApplicationContext(AppConfig.class);

    MemberService memberService = applicationContext.getBean("memberService", MemberService.class);

    Member m = new Member(1L, "name", Grade.VIP);
    memberService.join(m);

    System.out.println(memberService.findMember(m.getId()).getName());
  }
}
