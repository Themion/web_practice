package themion7.spring_websocket.spring_websocket.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import lombok.AllArgsConstructor;
import themion7.spring_websocket.spring_websocket.dto.MessageDTO;

@AllArgsConstructor
@Service
public class NotificationService {

    private final SimpMessagingTemplate messagingTemplate;

    public void sendPublicNotification() {
        MessageDTO messageDTO = new MessageDTO(
            "Public Notification"
        );

        messagingTemplate.convertAndSend(
            "/topic/notification/public",
            messageDTO
        );
    }

    public void sendPrivateNotification(final String user) {
        MessageDTO messageDTO = new MessageDTO(
            "Private Notification"
        );

        messagingTemplate.convertAndSendToUser(
            user,
            "/topic/notification/private",
            messageDTO
        );
    }
}
