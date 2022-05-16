package themion7.spring_websocket.spring_websocket.controller;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;
import org.springframework.web.util.HtmlUtils;

import themion7.spring_websocket.spring_websocket.dto.MessageDTO;

@Controller
public class MessageController {

    @MessageMapping("/message")
    @SendTo("/topic/messages")
    public MessageDTO getMessage(MessageDTO dto) {
        dto.setContent(HtmlUtils.htmlEscape(dto.getContent()));
        return dto;
    }
}
