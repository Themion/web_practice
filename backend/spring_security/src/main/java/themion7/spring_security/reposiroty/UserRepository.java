package themion7.spring_security.reposiroty;

import java.util.List;
import java.util.Optional;

import themion7.spring_security.domain.User;

public interface UserRepository {
    public User save(User user);
    public List<User> saveAll(List<User> users);
    public Optional<User> findById(Long id);
    public Optional<User> findByUsername(String username);
    public List<User> findAll();
}
