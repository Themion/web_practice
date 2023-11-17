package com.example.kotlin.controller.response

import com.example.kotlin.model.http.UserRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RequestMapping("/api/response")
@RestController
class ResponseAPIController {
    @GetMapping
    fun getMapping(@RequestParam(required = false) age: Int?): ResponseEntity<String> {

        age?.let {
            if (it < 20)
                return ResponseEntity.status(400).body("age must be greater than (or equal to) 20")

            return ResponseEntity.ok("succeeded")
        } ?: kotlin.run {
            return ResponseEntity.status(400).body("You must sepcity the age!")
        }
    }

    @PostMapping
    fun postMapping(@RequestBody userRequest: UserRequest?): ResponseEntity<Any> {
        return ResponseEntity.status(200).body<Any>(userRequest)
    }

    @PutMapping
    fun putMapping(@RequestBody userRequest: UserRequest?): ResponseEntity<UserRequest> {
        return ResponseEntity.status(HttpStatus.CREATED).body(userRequest)
    }

     @DeleteMapping("/{id}")
    fun deleteMapping(@PathVariable id: Int): ResponseEntity<Nothing> {
        return ResponseEntity.status(500).body(null)
    }
}
