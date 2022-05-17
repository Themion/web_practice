package themion7.spring_websocket.spring_websocket.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion7.spring_websocket.spring_websocket.dto.MessageDTO;
import themion7.spring_websocket.spring_websocket.service.NotificationService;
import themion7.spring_websocket.spring_websocket.service.WebSocketService;

@RestController
@RequestMapping("message")
@AllArgsConstructor
public class WebSocketController {

    private final NotificationService notificationService;
    private WebSocketService webSocketService;

    @RequestMapping(method = RequestMethod.POST, value="")
    public void sendPublicMessage(@RequestBody final MessageDTO messageDTO) {
        notificationService.sendPublicNotification();
        webSocketService.notifyFrontend(messageDTO.getContent());
    }

    @RequestMapping(method = RequestMethod.POST, value="{user}")
    public void sendPrivateMessage(
        @PathVariable final String user,
        @RequestBody final MessageDTO messageDTO
    ) {
        notificationService.sendPrivateNotification(user);
        webSocketService.notifyUser(user, messageDTO.getContent());
    }
}
