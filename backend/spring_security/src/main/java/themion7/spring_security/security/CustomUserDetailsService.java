package themion7.spring_security.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.reposiroty.UserRepository;

@Service
@AllArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

    private final UserRepository repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = this.repo.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Username " + username + " not found"));
        return new CustomUserDetails(user);
    }
    
}
