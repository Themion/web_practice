package themion7.spring_security.security.jwt;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import themion7.spring_security.domain.User;
import themion7.spring_security.repository.UserRepository;
import themion7.spring_security.security.CustomUserDetails;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

public class JwtAuthorizationFilter extends BasicAuthenticationFilter {

    private final UserRepository userRepository;

    public JwtAuthorizationFilter(AuthenticationManager authenticationManager,
            AuthenticationEntryPoint authenticationEntryPoint, UserRepository userRepository) {
        super(authenticationManager, authenticationEntryPoint);

        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        // Read the Authorization header, where the JWT token should be
        String header = request.getHeader(JwtUtils.HEADER);

        // If header is present, try grab user principal from database and perform authorization
        if (header != null && header.startsWith(JwtUtils.PREFIX)) {
            Authentication auth = getUsernamePasswordAuthentication(request);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }

        // Continue filter execution
        chain.doFilter(request, response);
    }

    private Authentication getUsernamePasswordAuthentication(HttpServletRequest request) {
        String token = request.getHeader(JwtUtils.HEADER).replace(JwtUtils.PREFIX, "");

        if (token != null) {
            // parse the token and validate it
            String username = JWT.require(HMAC512(JwtUtils.SECRET))
                .build()
                .verify(token)
                .getSubject();

            // Search in the DB if we find the user by token subject (username)
            // If so, then grab user details and create spring auth token using username, pass, authorities/roles
            if (username != null) {
                User user = userRepository.findByUsername(username).get();
                CustomUserDetails userDetails = new CustomUserDetails(user);
                UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(username, null, userDetails.getAuthorities());

                return auth;
            }
        }

        return null;
    }
}
