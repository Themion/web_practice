package com.example.kotlin.validator

import com.example.kotlin.annotation.StringFormatDateTime
import java.lang.Exception
import java.time.LocalDateTime
import java.time.format.DateTimeFormatter
import javax.validation.ConstraintValidator
import javax.validation.ConstraintValidatorContext

class StringFormatDateTimeValidator : ConstraintValidator<StringFormatDateTime, String> {

    private var pattern: String? = null

    override fun initialize(constraintAnnotation: StringFormatDateTime?) {
        super.initialize(constraintAnnotation)
        pattern = constraintAnnotation?.pattern
    }
    override fun isValid(value: String?, context: ConstraintValidatorContext?) =
        try { LocalDateTime.parse(value, pattern?.let { DateTimeFormatter.ofPattern(it) }); true }
        catch (e: Exception) { false }

}