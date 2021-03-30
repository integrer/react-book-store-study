package com.nbibik.bookstore

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry

import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "http://0.0.0.0:3000",
                "http://127.0.0.1:3000",
                "http://localhost:8080",
                "http://0.0.0.0:8080",
                "http://127.0.0.1:8080",
            )
            .allowedHeaders("*")
            .allowedMethods("*")
    }
}