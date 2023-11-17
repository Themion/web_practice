package com.example.kotlin.controller.get

import com.example.kotlin.model.http.UserRequest
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/api")
class GetAPIController {
    @GetMapping("/hello")
    fun hello(): String {
        return "Hello Spring!"
    }

    @RequestMapping(method = [RequestMethod.GET], path = ["request-mapping"])
    fun requestMapping(): String {
        return "requestMapping"
    }

    @GetMapping("/get-mapping/path-variable/{name}/{age}")
    fun pathVariable(@PathVariable name: String, @PathVariable("age") int: Int): String {
        println("$name $int")
        return "$name $int"
    }

    @GetMapping("/query-param")
    fun queryParam(@RequestParam("foo") foo: String): String {
        return foo
    }

    @GetMapping("/query-param-object")
    fun queryParamObject(userRequest: UserRequest): UserRequest {
        return userRequest
    }

    @GetMapping("/query-param-map")
    fun queryParamMap(@RequestParam map: Map<String, Any>): Map<String, Any> {
        return map
    }
}
