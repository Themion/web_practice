package com.example.kotlin.controller.post

import com.example.kotlin.model.http.UserRequest
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class PostAPIController {
    @PostMapping
    fun postMapping(): String {
        return "mapping"
    }

    @RequestMapping(method = [RequestMethod.POST], path = ["/request-mapping"])
    fun requestMapping(): String {
        return "request-mapping"
    }

    @PostMapping("/post-request-body")
    fun postMappingBody(@RequestBody body: UserRequest): UserRequest {
        println(body)
        return body
    }
}
