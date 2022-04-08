package themion7.spring_security.security.jwt;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtils {
    public static Long TOKEN_LIFE_SPAN;

    public static String SECRET;
    
    public static String HEADER;

    public static String PREFIX;

    @Value("${jwt.token-life-span}")
    public void setTokenLifeSpan(Long tokenLifeSpan) {
        JwtUtils.TOKEN_LIFE_SPAN = tokenLifeSpan;
    }

    @Value("${jwt.secret}")
    public void setSecret(String secret) {
        JwtUtils.SECRET = secret;
    }

    @Value("${jwt.header}")
    public void setHeader(String header) {
        JwtUtils.HEADER = header;
    }

    @Value("${jwt.prefix}")
    public void setPrefix(String prefix) {
        JwtUtils.PREFIX = prefix + ' ';
    }

}
