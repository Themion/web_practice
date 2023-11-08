package hello.login.web.session;

import java.util.Arrays;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Component;

@Component
public class SessionManager {
    private static final String SESSION_COOKIE_NAME = "mySessionId";
    private Map<String, Object> sessionStore = new ConcurrentHashMap<>();

    public void createSeesion(Object value, HttpServletResponse res) {
        String sessionId = UUID.randomUUID().toString();
        sessionStore.put(sessionId, value);

        Cookie sessionCookie = new Cookie(SESSION_COOKIE_NAME, sessionId);
        res.addCookie(sessionCookie);
    }

    public Object getSession(HttpServletRequest req) {
        Optional<Cookie> sessionCookie = findCookie(req, SESSION_COOKIE_NAME);

        if (!sessionCookie.isPresent())
            return null;

        return sessionStore.get(sessionCookie.get().getValue());
    }

    public void expire(HttpServletRequest req) {
        Optional<Cookie> sessionCookie = findCookie(req, SESSION_COOKIE_NAME);

        if (sessionCookie.isPresent())
            sessionStore.remove(sessionCookie.get().getValue());
    }

    public Optional<Cookie> findCookie(HttpServletRequest req, String cookieName) {
        Cookie[] cookies = req.getCookies();
        if (cookies == null)
            return Optional.empty();

        return Arrays.stream(cookies).filter(
                cookie -> cookie.getName().equals(cookieName)).findFirst();
    }
}
