package themion7.spring_security.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.AllArgsConstructor;
import themion7.spring_security.domain.User;
import themion7.spring_security.reposiroty.UserRepository;

@RestController
@AllArgsConstructor
@RequestMapping("api")
public class PublicRestApiController {

    private final UserRepository repo;

    @GetMapping("test1")
    public String test1(){
        return "API Test 1";
    }

    @GetMapping("test2")
    public String test2(){
        return "API Test 2";
    }

    @GetMapping("users")
    public List<User> users() {
        return this.repo.findAll();
    }

}
