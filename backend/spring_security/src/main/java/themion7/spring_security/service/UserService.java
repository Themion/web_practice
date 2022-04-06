package themion7.spring_security.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.Permission;
import themion7.spring_security.domain.Role;
import themion7.spring_security.domain.User;
import themion7.spring_security.reposiroty.PermissionRepository;
import themion7.spring_security.reposiroty.RoleRepository;
import themion7.spring_security.reposiroty.UserRepository;
import themion7.spring_security.security.PasswordEncoder;

@AllArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final PasswordEncoder encoder;

    public User save(User user) {
        user.setPassword(encoder.encode(user.getPassword()));

        userRepository.save(user);

        Long userId = user.getId();

        user.getRoles().forEach(role -> {
            roleRepository.save(new Role(userId, role));
        });
        user.getPermissions().forEach(permission -> {
            permissionRepository.save(new Permission(userId, permission));
        });

        return user;
    }

    public List<User> saveAll(List<User> users) {
        List<User> result = new ArrayList<>();
        users.forEach(user -> result.add(this.save(user)));
        return result;
    }

    private User setRolesAndPermissions (User user) {
        Long userId = user.getId();

        List<String> roles = new ArrayList<>();
        List<String> permissions = new ArrayList<>();

        roleRepository.findByUserId(userId).forEach(role -> roles.add(role.getRole()));
        permissionRepository.findByUserId(userId).forEach(permission -> permissions.add(permission.getPermission()));

        user.setRoles(roles);
        user.setPermissions(permissions);

        return user;
    }

    public Optional<User> findById(Long id) {
        Optional<User> result = userRepository.findById(id);
        result.ifPresent(user -> setRolesAndPermissions(user));

        return result;
    }

    public Optional<User> findByUsername(String username) {
        Optional<User> result = userRepository.findByUsername(username);
        result.ifPresent(user -> setRolesAndPermissions(user));

        return result;
    }

    public List<User> findAll() {
        List<User> result = userRepository.findAll();
        result.forEach(user -> setRolesAndPermissions(user));

        return result;
    }
    
}
