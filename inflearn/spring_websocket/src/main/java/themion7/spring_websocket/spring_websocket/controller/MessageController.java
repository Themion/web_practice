package themion7.spring_websocket.spring_websocket.controller;

import java.security.Principal;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import lombok.AllArgsConstructor;
import themion7.spring_websocket.spring_websocket.dto.MessageDTO;
import themion7.spring_websocket.spring_websocket.service.NotificationService;

@Controller
@AllArgsConstructor
public class MessageController {

    private NotificationService notificationService;

    @MessageMapping("/public")
    @SendTo("/topic/public")
    public MessageDTO getMessage(final MessageDTO dto) {
        notificationService.sendPublicNotification();
        dto.setContent(HtmlUtils.htmlEscape(dto.getContent()));
        return dto;
    }

    @MessageMapping("/private")
    @SendToUser("/topic/private")
    public MessageDTO getPrvateMessage(
        final MessageDTO dto,
        final Principal principal
    ) {
        notificationService.sendPrivateNotification(principal.getName());
        dto.setContent(
            "Sending private message to user " +
            principal.getName() + ": " +
            HtmlUtils.htmlEscape(dto.getContent())
        );
        return dto;
    }
}
