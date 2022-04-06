package themion7.spring_security.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.reposiroty.UserRepository;
import themion7.spring_security.security.PasswordEncoder;

@AllArgsConstructor
public class UserService {
    private final UserRepository repo;
    private final PasswordEncoder encoder;

    public User save(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        return repo.save(user);
    }

    public List<User> saveAll(List<User> users) {
        List<User> result = new ArrayList<>();
        users.forEach(user -> result.add(this.save(user)));
        return result;
    }

    public Optional<User> findById(Long id) {
        return repo.findById(id);
    }

    public Optional<User> findByUsername(String username) {
        return repo.findByUsername(username);
    }

    public List<User> findAll() {
        return repo.findAll();
    }
    
}
