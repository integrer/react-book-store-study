package com.nbibik.bookstore

import org.springframework.context.annotation.Configuration
import org.springframework.web.servlet.config.annotation.CorsRegistry

import org.springframework.web.servlet.config.annotation.EnableWebMvc
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer


@Configuration
@EnableWebMvc
class WebConfig : WebMvcConfigurer {
    override fun addCorsMappings(registry: CorsRegistry) {
        val allowedHosts = sequenceOf("localhost", "127.0.0.1", "0.0.0.0")
        val allowedPorts = sequenceOf("3000", "8080")
        registry.addMapping("/**")
            .allowedOrigins(
                *allowedHosts.flatMap { h -> allowedPorts.map { p -> "http://$h:$p" } }.toList().toTypedArray()
            )
            .allowedHeaders("*")
            .allowedMethods("*")
    }
}