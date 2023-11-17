package com.example.kotlin.controller.delete

import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController
import javax.validation.constraints.Min
import javax.validation.constraints.NotNull
import javax.validation.constraints.Size

@RestController
@RequestMapping("/api")
@Validated
class DeleteAPIController {

    @DeleteMapping("/request-mapping")
    fun deleteMapping(
        @RequestParam name: String,
        @RequestParam
        @NotNull(message = "Age cannot be null value")
        @Min(value = 20, message = "Age should be bigger than 20") age: Int,
    ): String {
        return "$name $age"
    }

    @DeleteMapping(path = ["/delete-mapping/{name}/{age}"])
    fun deleteMappingPath(
        @PathVariable
        @NotNull
        @Size(min = 2, max = 5, message = "name의 길이는 2에서 5까지")
        name: String,

        @PathVariable
        @NotNull(message = "Age cannot be null value")
        @Min(value = 20, message = "Age should be bigger than 20") age: Int,
    ): String {
        return "$name $age"
    }
}