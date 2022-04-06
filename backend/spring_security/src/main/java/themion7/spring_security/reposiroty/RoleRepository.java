package themion7.spring_security.reposiroty;

import java.util.List;

import themion7.spring_security.domain.Role;

public interface RoleRepository {
    public Role save(Role role);
    public List<Role> saveAll(List<Role> roles);
    public List<Role> findByUserId(Long userId);
}
