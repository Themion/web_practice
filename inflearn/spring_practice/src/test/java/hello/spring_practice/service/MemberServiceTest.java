package hello.spring_practice.service;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import hello.spring_practice.domain.Member;
import hello.spring_practice.repository.MemoryMemberRepository;

import static org.assertj.core.api.Assertions.*;

public class MemberServiceTest {
    MemberService service;
    MemoryMemberRepository repo;

    @BeforeEach
    public void beforeEach() { 
        repo = new MemoryMemberRepository();
        service = new MemberService(repo); 
    }

    @AfterEach
    public void afterEach() {
        repo.clear();
    }

    @Test
    public void joinTest() {
        Member m1 = new Member("member1"), m2 = new Member("member2");
        assertThat(service.findById(service.join(m1)).get()).isEqualTo(m1);
        assertThat(service.findById(service.join(m2)).get()).isEqualTo(m2);
    }

    @Test
    public void validateDuplicatedMemberTest() {
        Member m1 = new Member("member1"), m2 = new Member("member1");
        service.join(m1);
        IllegalStateException e = assertThrows(IllegalStateException.class, () -> service.join(m2)); 
        assertThat(e.getMessage()).isEqualTo("이미 존재하는 회원");
    }

    @Test
    public void findMembersTest() {
        service.join(new Member("member1"));
        service.join(new Member("member2"));
        assertThat(service.findMembers().size()).isEqualTo(2);
    }

    @Test
    public void findByIdTest() {
        Member m = new Member("member");
        Long id = service.join(m);
        assertThat(id).isEqualTo(m.getId());
    }
}
