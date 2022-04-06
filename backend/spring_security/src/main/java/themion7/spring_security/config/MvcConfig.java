package themion7.spring_security.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import themion7.spring_security.reposiroty.JdbcPermissionRepository;
import themion7.spring_security.reposiroty.JdbcRoleRepository;
import themion7.spring_security.reposiroty.JdbcUserRepository;
import themion7.spring_security.reposiroty.PermissionRepository;
import themion7.spring_security.reposiroty.RoleRepository;
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
        return new UserService(userRepository(), roleRepository(), permissionRepository(), encoder);
    }

    @Bean
    public UserRepository userRepository() {
        return new JdbcUserRepository(dataSource);
    }

    @Bean 
    public RoleRepository roleRepository() {
        return new JdbcRoleRepository(dataSource);
    }

    @Bean
    public PermissionRepository permissionRepository() {
        return new JdbcPermissionRepository(dataSource);
    }

}
