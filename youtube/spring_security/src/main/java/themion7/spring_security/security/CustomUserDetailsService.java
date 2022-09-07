package themion7.spring_security.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.repository.UserRepository;

@Component
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final UserRepository service;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.service.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
        return new CustomUserDetails(user);
    }
    
}
