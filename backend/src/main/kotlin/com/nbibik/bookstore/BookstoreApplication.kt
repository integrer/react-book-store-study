package com.nbibik.bookstore

import io.github.cdimascio.dotenv.dotenv
import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class BookstoreApplication

fun configureEnv() {
    val mode = "development"
    sequenceOf(".env", ".env.local", ".env.${mode}", ".env.${mode}.local").forEach {
        dotenv {
            filename = it
            ignoreIfMalformed = true
            ignoreIfMissing = true
            systemProperties = true
        }
    }
}

fun main(args: Array<String>) {
    configureEnv()
    runApplication<BookstoreApplication>(*args)
}
