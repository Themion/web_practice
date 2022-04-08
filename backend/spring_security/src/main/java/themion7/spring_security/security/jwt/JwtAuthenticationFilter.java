package themion7.spring_security.security.jwt;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.auth0.jwt.JWT;
import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import themion7.spring_security.dto.UserDto;
import themion7.spring_security.security.CustomUserDetails;

import static com.auth0.jwt.algorithms.Algorithm.HMAC512;

@RequiredArgsConstructor
public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter{

    @NonNull
    private AuthenticationManager authenticationManager;

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        // Get UserDto from request using ObjectMapper
        UserDto userDto = null;

        try {
            userDto = new ObjectMapper().readValue(request.getInputStream(), UserDto.class);
        } catch (IOException e) {
            e.printStackTrace();
        }

        // Create login token using UserDto
        UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
            userDto.getUsername(), 
            userDto.getPassword(),
            new ArrayList<>()
        );

        // Return authenticated user by authenticating login token
        return authenticationManager.authenticate(token);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    
        // Grab UserDetails
        CustomUserDetails userDetails = (CustomUserDetails) authResult.getPrincipal();

        // Create JWT Token
        String token = JWT.create()
            .withSubject(userDetails.getUsername())
            .withExpiresAt(new Date(System.currentTimeMillis() + JwtUtils.TOKEN_LIFE_SPAN))
            .sign(HMAC512(JwtUtils.SECRET));

        // Add token in response
        response.addHeader(JwtUtils.HEADER, JwtUtils.PREFIX + token);
    }
}
