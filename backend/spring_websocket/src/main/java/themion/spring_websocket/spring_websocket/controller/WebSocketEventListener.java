package themion.spring_websocket.spring_websocket.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import themion.spring_websocket.spring_websocket.model.ChatMessage;
import themion.spring_websocket.spring_websocket.model.MessageType;

@Component
public class WebSocketEventListener {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebSocketEventListener.class);

    @Autowired
    private SimpMessageSendingOperations sendingOperations;

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        LOGGER.info("Here comes a new chatter!");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap((event.getMessage()));
        String username = (String) headerAccessor.getSessionAttributes().get("username");

        ChatMessage chatMessage = ChatMessage.builder()
            .type(MessageType.DISCONNECT)
            .sender(username)
            .build();
        
        sendingOperations.convertAndSend("/topic/public", chatMessage);
    }
}
