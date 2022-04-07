package themion7.spring_security.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
// import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import lombok.AllArgsConstructor;
import themion7.spring_security.security.CustomUserDetailsService;
import themion7.spring_security.security.PasswordEncoder;

@Configuration
@EnableWebSecurity
@AllArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private CustomUserDetailsService userDetailsService;
    private PasswordEncoder encoder;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .authorizeRequests()
                .antMatchers("/home").permitAll()
                .antMatchers("/profile").authenticated()
                .antMatchers("/admin").hasRole("ADMIN")
                .antMatchers("/management").hasAnyRole("ADMIN", "MANAGER")
                .antMatchers("/api/test1").hasAuthority("ACCESS_TEST1")
                .antMatchers("/api/test2").hasAuthority("ACCESS_TEST2")
                .antMatchers("/api/users").hasRole("ADMIN")
                .and()
            // .httpBasic();
            .formLogin()
                .loginPage("/login").permitAll()
                    .and()
                .logout()
                    // get method로 logout
                    // .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                    .logoutUrl("/logout")
                    .logoutSuccessUrl("/login?logout");
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
