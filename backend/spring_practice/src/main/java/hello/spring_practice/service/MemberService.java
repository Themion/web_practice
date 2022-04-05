package hello.spring_practice.service;

import java.util.List;
import java.util.Optional;

import org.springframework.transaction.annotation.Transactional;

import hello.spring_practice.domain.Member;
import hello.spring_practice.repository.MemberRepository;
// import hello.spring_practice.repository.MemoryMemberRepository;

@Transactional
public class MemberService {
    private final MemberRepository repo;

    public MemberService(MemberRepository repository) {
        this.repo = repository;
    }

    public Long join(Member member) {
        validateDuplicatedMember(member);

        repo.save(member);
        return member.getId();
    }

    private void validateDuplicatedMember(Member member) {
        repo.findByName(member.getName()).ifPresent(m -> {
            throw new IllegalStateException("이미 존재하는 회원");
        });
    }

    public List<Member> findMembers() {
        return repo.findAll();
    }

    public Optional<Member> findById(Long id) {
        return repo.findById(id);
    }
}
