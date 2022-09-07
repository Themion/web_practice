package hello.spring_practice.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hello.spring_practice.domain.Member;

public interface SpringDataJpaMemberRepository extends JpaRepository<Member, Long>, MemberRepository {
    
    @Override
    Optional<Member> findByName(String name);

}
