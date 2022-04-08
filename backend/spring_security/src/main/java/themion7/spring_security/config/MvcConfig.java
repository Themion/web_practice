package themion7.spring_security.config;

import javax.sql.DataSource;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import themion7.spring_security.dao.JdbcPermissionDao;
import themion7.spring_security.dao.JdbcRoleDao;
import themion7.spring_security.dao.JdbcUserDao;
import themion7.spring_security.dao.PermissionDao;
import themion7.spring_security.dao.RoleDao;
import themion7.spring_security.dao.UserDao;
import themion7.spring_security.repository.UserRepository;
import themion7.spring_security.security.PasswordEncoder;

@Configuration
@AllArgsConstructor
public class MvcConfig {
    
    private final DataSource dataSource;
    private final PasswordEncoder encoder;

    @Bean
    public UserRepository userService() {
        return new UserRepository(userRepository(), roleRepository(), permissionRepository(), encoder);
    }

    @Bean
    public UserDao userRepository() {
        return new JdbcUserDao(dataSource);
    }

    @Bean 
    public RoleDao roleRepository() {
        return new JdbcRoleDao(dataSource);
    }

    @Bean
    public PermissionDao permissionRepository() {
        return new JdbcPermissionDao(dataSource);
    }

}
