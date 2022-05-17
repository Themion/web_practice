package themion7.spring_websocket.spring_websocket.controller;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion7.spring_websocket.spring_websocket.dto.MessageDTO;
import themion7.spring_websocket.spring_websocket.service.WebSocketService;

@RestController()
@AllArgsConstructor
public class WebSocketController {

    private WebSocketService webSocketService;

    @RequestMapping(method = RequestMethod.POST, path="/message")
    public void sendPublicMessage(@RequestBody final MessageDTO messageDTO) {
        webSocketService.notifyFrontend(messageDTO.getContent());
    }

    @RequestMapping(method = RequestMethod.POST, path="/message/{user}")
    public void sendPrivateMessage(
        @PathVariable final String user,
        @RequestBody final MessageDTO messageDTO
    ) {
        webSocketService.notifyUser(user, messageDTO.getContent());
    }
}
