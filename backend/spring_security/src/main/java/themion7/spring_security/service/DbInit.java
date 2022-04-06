package themion7.spring_security.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.reposiroty.UserRepository;

@Service
@AllArgsConstructor
public class DbInit implements CommandLineRunner {

    private final UserRepository repo;

    @Override
    public void run(String... args) throws Exception {
        User user = new User("user", "user123", "USER", "");
        User admin = new User("admin", "admin123", "ADMIN", "ACCESS_TEST1,ACCESS_TEST2");
        User manager = new User("manager", "manager123", "ADMIN", "ACCESS_TEST1");

        List<User> users = Arrays.asList(user, admin, manager);
        
        this.repo.saveAll(users);
    }
    
}
