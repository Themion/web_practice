package com.example.kotlin.advice

import com.example.kotlin.controller.exception.ExceptionAPIController
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.RestControllerAdvice

@RestControllerAdvice(basePackageClasses = [ExceptionAPIController::class])
class GlobalControllerAdvice {
    @ExceptionHandler(value = [RuntimeException::class])
    fun exception(e: RuntimeException): ResponseEntity<String> {
        return ResponseEntity.internalServerError().body("Server Error")
    }

    // @ExceptionHandler(value = [IndexOutOfBoundsException::class])
    // fun indexOutOfBoundsException(e: IndexOutOfBoundsException): ResponseEntity<String> {
    //     return ResponseEntity.internalServerError().body("Index Error")
    // }
}