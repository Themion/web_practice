package themion7.spring_security.reposiroty;

import java.util.List;

import themion7.spring_security.domain.Permission;

public interface PermissionRepository {
    public Permission save(Permission permission);
    public List<Permission> saveAll(List<Permission> permissions);
    public List<Permission> findByUserId(Long userId);
}
