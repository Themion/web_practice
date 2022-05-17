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

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public MessageDTO getMessage(final MessageDTO dto) {
        dto.setContent(HtmlUtils.htmlEscape(dto.getContent()));
        notificationService.sendPublicNotification();
        return dto;
    }

    @MessageMapping("/private_message")
    @SendToUser("/topic/private_messages")
    public MessageDTO getPrvateMessage(
        final MessageDTO dto,
        final Principal principal
    ) {
        dto.setContent(
            "Sending private message to user " +
            principal.getName() + ": " +
            HtmlUtils.htmlEscape(dto.getContent())
        );
        notificationService.sendPrivateNotification(principal.getName());
        return dto;
    }
}