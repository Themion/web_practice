package themion7.spring_security.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.service.UserService;

@Component
@AllArgsConstructor
public class DbInit implements CommandLineRunner {

    private final UserService service;

    @Override
    public void run(String... args) throws Exception {
        User user = User.builder()
            .username("user")
            .password("user123")
            .role("USER")
            .build();
        User admin = User.builder()
            .username("admin")
            .password("admin123")
            .role("ADMIN")
            .permission("ACCESS_TEST1")
            .permission("ACCESS_TEST2")
            .build();
        User manager = User.builder()
            .username("manager")
            .password("manager123")
            .role("MANAGER")
            .permission("ACCESS_TEST1")
            .build();

        List<User> users = Arrays.asList(user, admin, manager);
        
        this.service.saveAll(users);
    }
    
}
