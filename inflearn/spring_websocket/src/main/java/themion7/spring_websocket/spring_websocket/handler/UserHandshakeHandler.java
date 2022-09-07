package themion7.spring_websocket.spring_websocket.handler;

import com.sun.security.auth.UserPrincipal;
import java.security.Principal;
import java.util.Map;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.support.DefaultHandshakeHandler;

public class UserHandshakeHandler extends DefaultHandshakeHandler {

    private final Logger LOG = LoggerFactory.getLogger(UserHandshakeHandler.class);

    @Override
    protected Principal determineUser(ServerHttpRequest request, WebSocketHandler wsHandler,
            Map<String, Object> attributes) {
        final String randomId = UUID.randomUUID().toString();

        LOG.info("Here comes a new chatter: '{}'", randomId);

        return new UserPrincipal(randomId);
    }

}
