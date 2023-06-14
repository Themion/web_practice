package hello.core.member;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import hello.core.AppConfig;

public class MemberServiceTest {
  MemberService memberService;

  @BeforeEach
  public void beforeEach() {
    AppConfig appConfig = new AppConfig();
    memberService = appConfig.memberService();
  }

  @Test
  void join() {
    // given
    Member joinMember = new Member(1L, "memberA", Grade.VIP);

    // when
    memberService.join(joinMember);
    Member findMember = memberService.findMember(joinMember.getId());
    Member findMember2 = memberService.findMember(joinMember.getId() + 1);

    // then
    Assertions.assertThat(joinMember).isEqualTo(findMember);
    Assertions.assertThat(joinMember).isNotEqualTo(findMember2);
  }
}
