package themion7.spring_websocket.spring_websocket.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import themion7.spring_websocket.spring_websocket.dto.MessageDTO;

@AllArgsConstructor
@Service
public class WebSocketService {

    private final SimpMessagingTemplate messagingTemplate;
    private final NotificationService notificationService;

    public void notifyFrontend(final String message) {
        MessageDTO messageDTO = new MessageDTO(message);
        notificationService.sendPublicNotification();
        messagingTemplate.convertAndSend(
            "/topic/messages",
            messageDTO
        );
    }

    public void notifyUser(final String user, final String message) {
        MessageDTO messageDTO = new MessageDTO(message);
        notificationService.sendPrivateNotification(user);
        messagingTemplate.convertAndSendToUser(
            user,
            "/topic/private_messages",
            messageDTO
        );
    }

}
