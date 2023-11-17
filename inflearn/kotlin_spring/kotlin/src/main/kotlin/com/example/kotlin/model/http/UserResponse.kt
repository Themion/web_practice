package com.example.kotlin.model.http

import com.fasterxml.jackson.annotation.JsonProperty

data class UserResponse(
    var result: UserResult,
    var description: String,
    @JsonProperty("user")
    var userRequest: MutableList<UserRequest>? = null
)
