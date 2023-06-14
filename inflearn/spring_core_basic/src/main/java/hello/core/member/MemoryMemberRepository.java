package hello.core.member;

import java.util.HashMap;
import java.util.Map;

public class MemoryMemberRepository implements MemberRespository{
  private static Map<Long, Member> map = new HashMap<>();

  @Override
  public void save(Member member) {
     map.put(member.getId(), member);
  }

  @Override
  public Member findById(Long id) {
    return map.get(id);
  }
  
}
