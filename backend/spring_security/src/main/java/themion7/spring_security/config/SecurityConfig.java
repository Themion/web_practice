package themion7.spring_security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.config.http.SessionCreationPolicy;

import lombok.AllArgsConstructor;
import themion7.spring_security.repository.UserRepository;
import themion7.spring_security.security.CustomUserDetailsService;
import themion7.spring_security.security.PasswordEncoder;
import themion7.spring_security.security.jwt.JwtAuthenticationFilter;
import themion7.spring_security.security.jwt.JwtAuthorizationFilter;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private CustomUserDetailsService userDetailsService;
    private PasswordEncoder encoder;
    private UserRepository userRepository;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            // Disabling Cross-Site Request Forgery defense
            .csrf()
                .disable()
            // Removing state from session
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            // Adding jwt filters in exact order
            .addFilter(new JwtAuthenticationFilter(authenticationManager()))
            .addFilter(new JwtAuthorizationFilter(authenticationManager(), this.userRepository))
            .authorizeRequests()
                .antMatchers("/home", "/login").permitAll()
                .antMatchers("/profile").authenticated()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/management").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/api/test1").hasAuthority("ACCESS_TEST1")
                .antMatchers("/api/test2").hasAuthority("ACCESS_TEST2")
                .antMatchers("/api/users").hasRole("ADMIN");
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) {
        auth
            .authenticationProvider(authenticationProvider());
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
        provider.setPasswordEncoder(encoder);
        provider.setUserDetailsService(this.userDetailsService);

        return provider;
    }

}
