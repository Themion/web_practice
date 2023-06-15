package hello.core.beanfind;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.Map;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.NoUniqueBeanDefinitionException;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

import hello.core.AppConfig;
import hello.core.discount.DiscountPolicy;
import hello.core.discount.FixDiscountPolicy;
import hello.core.discount.RateDiscountPolicy;

public class ApplicationContextExtendsFindText {
  AnnotationConfigApplicationContext ac = new AnnotationConfigApplicationContext(AppConfig.class);

  
  @Test
  @DisplayName("부모 타입으로 조회 시, 자식 포함 둘 이상 있다면, 오류")
  void findByParentType() {
    assertThrows(
      NoUniqueBeanDefinitionException.class,
      () -> ac.getBean(DiscountPolicy.class)
    );
  }

  @Test
  @DisplayName("부모 타입으로 조회 시, 자식 포함 둘 이상 있다면, 빈 이름을 지정")
  void findByNameAndParentType() {
    DiscountPolicy fixDiscountPolicy = ac.getBean("fixDiscountPolicy", DiscountPolicy.class);
    assertThat(fixDiscountPolicy).isInstanceOf(FixDiscountPolicy.class);
    DiscountPolicy rateDiscountPolicy = ac.getBean("rateDiscountPolicy", DiscountPolicy.class);
    assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class);
  }

  @Test
  @DisplayName("부모 타입으로 조회 시, 자식 포함 둘 이상 있다면, 서브 타입으로 지정")
  void findBySubType() {
    DiscountPolicy fixDiscountPolicy = ac.getBean(FixDiscountPolicy.class);
    assertThat(fixDiscountPolicy).isInstanceOf(FixDiscountPolicy.class);
    DiscountPolicy rateDiscountPolicy = ac.getBean(RateDiscountPolicy.class);
    assertThat(rateDiscountPolicy).isInstanceOf(RateDiscountPolicy.class);
  }
  
  @Test
  @DisplayName("부모 타입으로 모두 조회하기")
  void findAllByParentType() {
    Map<String, DiscountPolicy> beansOfType = ac.getBeansOfType(DiscountPolicy.class);
    assertThat(beansOfType.size()).isEqualTo(2);
  }
}
