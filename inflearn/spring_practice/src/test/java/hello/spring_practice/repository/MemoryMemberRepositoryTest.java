package hello.spring_practice.repository;

import org.junit.jupiter.api.AfterEach;
// import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;

import hello.spring_practice.domain.Member;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

class MemoryMemberRepositoryTest {
    MemoryMemberRepository repo = new MemoryMemberRepository();

    // 각 테스트 후 repo를 초기화
    @AfterEach
    public void afterEach() { repo.clear(); }
    
    @Test
    public void save() {
        Member member = new Member("spring");
        repo.save(member);
        
        Member result = repo.findById(member.getId()).get();
        // Assertions.assertThat(member).isEqualTo(result);
        assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName() {
        Member m1 = new Member("name1"), m2 = new Member("name2");
        repo.save(m1);
        repo.save(m2);

        Member res = repo.findByName("name1").get();
        assertThat(m1).isEqualTo(res);
    }

    @Test
    public void findAll() {
        Member m1 = new Member("name1"), m2 = new Member("name2");
        repo.save(m1);
        repo.save(m2);

        List<Member> res = repo.findAll();
        assertThat(res.size()).isEqualTo(2);
    }
}
