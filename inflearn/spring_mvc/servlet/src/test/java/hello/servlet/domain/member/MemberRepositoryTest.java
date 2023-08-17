package hello.servlet.domain.member;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.List;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.Test;

class MemberRepositoryTest {
  MemberRepository memberRepository = MemberRepository.getInstance();

  @AfterEach
  void afterEach() {
    memberRepository.clearStore();
  }

  @Test
  void save() {
    // given
    Member member = new Member("hello", 20);

    // when
    Member savedMember = memberRepository.save(member);

    // then
    Member findMember = memberRepository.findById(savedMember.getId());
    assertThat(findMember).isEqualTo(savedMember);
  }

  @Test
  void findAll() {
    // given
    Member member1 = new Member("hello", 20);
    Member member2 = new Member("hello", 30);

    // when
    memberRepository.save(member1);
    memberRepository.save(member2);
    List<Member> memberList = memberRepository.findAll();

    // then
    assertThat(memberList.size()).isEqualTo(2);
    assertThat(memberList).contains(member1);
    assertThat(memberList).contains(member2);
  }
}
