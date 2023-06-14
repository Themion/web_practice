package hello.core.member;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

public class MemberServiceTest {
  MemberService memberService = new MemberServiceImpl();

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
