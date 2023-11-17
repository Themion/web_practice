package com.example.kotlin.controller.put

import com.example.kotlin.model.http.UserRequest
import com.example.kotlin.model.http.UserResponse
import com.example.kotlin.model.http.UserResult
import org.springframework.http.ResponseEntity
import org.springframework.validation.BindingResult
import org.springframework.validation.FieldError
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestMethod
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@RequestMapping("/api")
class PutAPIController {
    @PutMapping
    fun putMapping(): String {
        return "put-mapping"
    }

    @RequestMapping(method = [RequestMethod.PUT], path = ["/request-mapping"])
    fun requestMapping(): String {
        return "request-mapping"
    }

    @PutMapping("object")
    fun putMappingObject(@Valid @RequestBody body: UserRequest, bindingResult: BindingResult): ResponseEntity<Any> {
        if (bindingResult.hasErrors()) {
            val errorMap = HashMap<String, String>()

            bindingResult.allErrors.forEach {
                val field = it as FieldError
                val msg = field.defaultMessage ?: ""

                errorMap[field.field] = msg
            }

            return ResponseEntity.badRequest().body(errorMap)
        }

        var userResponse = UserResponse(
            result = UserResult(
                resultCode = "OK",
                resultMessage = "OK_Message",
            ),
            description = "Test Response",
            userRequest = mutableListOf(
                UserRequest(
                    name = "aaa",
                    age = 111,
                    email = "aaa@test.com",
                    phoneNumber = "010-1111-1111",
                ),
                UserRequest(
                    name = "bbb",
                    age = 222,
                    email = "bbb@test.com",
                    phoneNumber = "010-2222-2222",
                ),
            ).apply {
                this.add(body)
            },
        )

        return ResponseEntity.ok(userResponse)
    }
}
