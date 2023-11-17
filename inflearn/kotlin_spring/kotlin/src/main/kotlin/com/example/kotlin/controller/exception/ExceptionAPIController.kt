package com.example.kotlin.controller.exception

import com.example.kotlin.model.http.ErrorInstance
import com.example.kotlin.model.http.ErrorResponse
import com.example.kotlin.model.http.UserRequest
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.FieldError
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.MethodArgumentNotValidException
import org.springframework.web.bind.annotation.ExceptionHandler
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import java.time.LocalDateTime
import javax.servlet.http.HttpServletRequest
import javax.validation.ConstraintViolationException
import javax.validation.Valid
import javax.validation.constraints.Min
import javax.validation.constraints.NotBlank
import javax.validation.constraints.Size

@RestController
@RequestMapping("/api/exception")
@Validated
class ExceptionAPIController {
    @GetMapping("/hello")
    fun hello(): String {
        val list = mutableListOf<String>()
        // val item = list[0]
        return "hello"
    }

    @GetMapping
    fun get(
        @NotBlank
        @Size(min = 2, max = 6)
        @RequestParam name: String,

        @Min(15)
        @RequestParam age: Int,
    ): String {
        return "$name $age"
    }

    @PostMapping
    fun post(@Valid @RequestBody userRequest: UserRequest): UserRequest {
        return userRequest
    }

    @ExceptionHandler(value = [MethodArgumentNotValidException::class])
    fun methodArgumentNotValidException(
        e: MethodArgumentNotValidException,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {
        val errors = e.bindingResult.allErrors.map {
            val err = it as FieldError

            ErrorInstance(
                fieldname = err.field,
                message = err.defaultMessage,
                value = err.rejectedValue
            )
        }.toMutableList()

        val response = ErrorResponse(
            resultCode = "FAIL",
            httpStatus = HttpStatus.BAD_REQUEST.value().toString(),
            httpMethod = request.method,
            message = "요청에 에러가 발생하였습니다.",
            path = request.requestURI.toString(),
            timestamp = LocalDateTime.now(),
            errors = errors,
        )

        return ResponseEntity.badRequest().body(response)
    }

    @ExceptionHandler(value = [ConstraintViolationException::class])
    fun constraintViolationException(
        e: ConstraintViolationException,
        request: HttpServletRequest,
    ): ResponseEntity<ErrorResponse> {

        val errors = e.constraintViolations.map {
            ErrorInstance(
                fieldname = it.propertyPath.last().name,
                message = it.message,
                value = it.invalidValue
            )
        }.toMutableList()

        val response = ErrorResponse(
            resultCode = "FAIL",
            httpStatus = HttpStatus.BAD_REQUEST.value().toString(),
            httpMethod = request.method,
            message = "요청에 에러가 발생하였습니다.",
            path = request.requestURI.toString(),
            timestamp = LocalDateTime.now(),
            errors = errors,
        )

        return ResponseEntity.badRequest().body(response)
    }

    @ExceptionHandler(value = [IndexOutOfBoundsException::class])
    fun indexOutOfBoundsException(e: IndexOutOfBoundsException): ResponseEntity<String> {
        return ResponseEntity.internalServerError().body("Index Error")
    }
}
