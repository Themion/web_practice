package themion7.spring_security.dao;

import java.util.List;

import themion7.spring_security.domain.Permission;

public interface PermissionDao {
    public Permission save(Permission permission);
    public List<Permission> saveAll(List<Permission> permissions);
    public List<Permission> findByUserId(Long userId);
}
