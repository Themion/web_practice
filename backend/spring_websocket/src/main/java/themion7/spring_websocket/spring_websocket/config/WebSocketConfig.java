package themion7.spring_websocket.spring_websocket.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    @Override
    public void configureMessageBroker(MessageBrokerRegistry registry) {
        registry
            // 주어진 prefix로 시작하는 경로로 메세지가 들어오면
            // @Controller의 @MessageMapping으로 전송
            .setApplicationDestinationPrefixes("/ws")
            // 주어진 prefix로 시작하는 경로를 subscribe하는
            // 클라이언트에게 메세지를 전송
            // 해당 경로는 내장된 STOMP broker가 관리
            .enableSimpleBroker("/topic");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        // SockJS를 이용해 연결을 유지할 경로
        registry.addEndpoint("/websocket").withSockJS();
    }
}
