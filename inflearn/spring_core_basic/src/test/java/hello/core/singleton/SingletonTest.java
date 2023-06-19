package hello.core.singleton;

import static org.assertj.core.api.Assertions.assertThat;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AppConfig;
import hello.core.member.MemberService;

public class SingletonTest {
  @Test
  @DisplayName("스프링 없는 순수한 DI 컨테이너")
  void pureContainer() {
    AppConfig appConfig = new AppConfig();

    MemberService ms1 = appConfig.memberService();
    MemberService ms2 = appConfig.memberService();

    assertThat(ms1).isNotSameAs(ms2);
  }

  @Test
  @DisplayName("싱글톤 패턴을 적용한 객체 사용")
  void singletonServiceTest() {
    SingletonService s1 = SingletonService.getInstance();
    SingletonService s2 = SingletonService.getInstance();

    assertThat(s1).isSameAs(s2);
  }
  @Test
  @DisplayName("스프링 컨테이너와 싱글톤")
  void springContainer() {
    ApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

    MemberService ms1 = ac.getBean(MemberService.class);
    MemberService ms2 = ac.getBean(MemberService.class);

    assertThat(ms1).isSameAs(ms2);

    ((ConfigurableApplicationContext) ac).close();
  }
}
