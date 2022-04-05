package hello.spring_practice.service;

// import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import hello.spring_practice.domain.Member;
import hello.spring_practice.repository.MemberRepository;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
public class MemberServiceIntegrationTest {

    @Autowired MemberService service;
    @Autowired MemberRepository repo;

    @Test
    public void joinTest() {
        Member m1 = new Member("member1"), m2 = new Member("member2");
        assertThat(service.findById(service.join(m1)).get().getName()).isEqualTo(m1.getName());
        assertThat(service.findById(service.join(m2)).get().getName()).isEqualTo(m2.getName());
    }

    @Test
    public void validateDuplicatedMemberTest() {
        Member m1 = new Member("member1"), m2 = new Member("member1");
        service.join(m1);
        /* IllegalStateException e = assertThrows(IllegalStateException.class, () -> service.join(m2)); 
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원"); */
        assertThat(m1.getId()).isNotNull();
        service.join(m2);
        assertThat(m2.getId()).isNull();
    }

    @Test
    public void findMembersTest() {
        long size = service.findMembers().size();
        service.join(new Member("member1"));
        service.join(new Member("member2"));
        assertThat(service.findMembers().size() - size).isEqualTo(2);
    }

    @Test
    public void findByIdTest() {
        Member m = new Member("member");
        Long id = service.join(m);
        assertThat(id).isEqualTo(m.getId());
    }
}
