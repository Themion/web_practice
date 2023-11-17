package com.example.kotlin.controller.exception

import com.example.kotlin.model.http.UserRequest
import com.fasterxml.jackson.module.kotlin.jacksonObjectMapper
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.result.MockMvcResultHandlers.print
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.content
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.util.LinkedMultiValueMap

@WebMvcTest
@AutoConfigureMockMvc
class ExceptionAPIControllerTest {
    @Autowired
    lateinit var mockMvc: MockMvc

    @Test
    fun helloTest() {
        mockMvc.perform(get("/api/exception/hello"))
            .andExpect(status().isOk)
            .andExpect(content().string("hello"))
            .andDo(print())
    }

    @Test
    fun getTest() {
        val queryParams = LinkedMultiValueMap<String, String>()
        val name = "mike"
        val age = 20

        queryParams.add("name", name)
        queryParams.add("age", age.toString())

        mockMvc.perform(get("/api/exception").queryParams(queryParams))
            .andExpect(status().isOk)
            .andExpect(content().string("$name $age"))
            .andDo(print())
    }

    @Test
    fun getFailTest() {
        val queryParams = LinkedMultiValueMap<String, String>()
        val name = "mike"
        val age = 10

        queryParams.add("name", name)
        queryParams.add("age", age.toString())

        mockMvc.perform(get("/api/exception").queryParams(queryParams))
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("\$.result_code").value("FAIL"))
            .andExpect(jsonPath("\$.errors[0].fieldname").value("age"))
            .andExpect(jsonPath("\$.errors[0].value").value(age))
            .andDo(print())
    }

    @Test
    fun postTest() {
        val userRequest = UserRequest(
            name = "mike",
            age = 20,
            phoneNumber = "010-2222-3333",
            address = "Washington",
            email = "test@email.com",
            createdAt = "2023-11-11 11:11:11"
        )

        val json = jacksonObjectMapper().writeValueAsString(userRequest)

        mockMvc.perform(
            post("/api/exception")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isOk)
            .andExpect(jsonPath("\$.name").value(userRequest.name))
            .andExpect(jsonPath("\$.age").value(userRequest.age))
            .andExpect(jsonPath("\$.phoneNumber").value(userRequest.phoneNumber))
            .andExpect(jsonPath("\$.address").value(userRequest.address))
            .andExpect(jsonPath("\$.email").value(userRequest.email))
            .andExpect(jsonPath("\$.createdAt").value(userRequest.createdAt))
            .andDo(print())
    }

    @Test
    fun postFailTest() {
        val userRequest = UserRequest(
            name = "mike",
            age = -20,
            phoneNumber = "010-2222-3333",
            address = "Washington",
            email = "test@email.com",
            createdAt = "2023-11-11 11:11:11"
        )

        val json = jacksonObjectMapper().writeValueAsString(userRequest)

        mockMvc.perform(
            post("/api/exception")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json)
                .accept(MediaType.APPLICATION_JSON)
        )
            .andExpect(status().isBadRequest)
            .andExpect(content().contentType(MediaType.APPLICATION_JSON))
            .andExpect(jsonPath("\$.result_code").value("FAIL"))
            .andExpect(jsonPath("\$.errors[0].fieldname").value("age"))
            .andExpect(jsonPath("\$.errors[0].value").value(userRequest.age))
            .andDo(print())
    }
}