package themion7.spring_security.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import themion7.spring_security.reposiroty.JdbcUserRepository;
import themion7.spring_security.reposiroty.UserRepository;
import themion7.spring_security.security.PasswordEncoder;
import themion7.spring_security.service.UserService;

@Configuration
@AllArgsConstructor
public class MvcConfig {
    
    private final DataSource dataSource;
    private final PasswordEncoder encoder;

    @Bean
    public UserService userService() {
        return new UserService(userRepository(), encoder);
    }

    @Bean
    public UserRepository userRepository() {
        return new JdbcUserRepository(dataSource);
    }

}
