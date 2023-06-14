package hello.core.member;

public interface MemberRespository {
  void save(Member member);
  Member findById(Long id);
}
