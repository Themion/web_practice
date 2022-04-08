package themion7.spring_security.dao;

import java.util.List;

import themion7.spring_security.domain.Role;

public interface RoleDao {
    public Role save(Role role);
    public List<Role> saveAll(List<Role> roles);
    public List<Role> findByUserId(Long userId);
}
