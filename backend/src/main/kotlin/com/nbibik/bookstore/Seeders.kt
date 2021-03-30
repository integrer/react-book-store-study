package com.nbibik.bookstore

import com.nbibik.bookstore.dao.BookRepository
import com.nbibik.bookstore.entity.BookEntity
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.context.event.ContextRefreshedEvent
import org.springframework.context.event.EventListener
import org.springframework.stereotype.Component
import javax.transaction.Transactional

fun bookSeeder(): ArrayList<BookEntity> = arrayListOf(
    BookEntity(
        "Eloquent JavaScript, Second Edition",
        "Marijn Haverbeke",
        2014,
        "programming",
        "9781593275846",
    ),
    BookEntity(
        "Learning JavaScript Design Patterns",
        "Addy Osmani",
        2012,
        "programming",
        "9781449331818",
    ),
    BookEntity(
        "An In-Depth Guide for Programmers",
        "Axel Rauschmayer",
        2014,
        "programming",
        "9781449365035",
    ),
    BookEntity(
        "Programming JavaScript Applications",
        "Eric Elliott",
        2014,
        "programming",
        "9781491950296",
    ),
    BookEntity(
        "Understanding ECMAScript 6",
        "Nicholas C. Zakas",
        2016,
        "programming",
        "9781593277574",
    ),
    BookEntity(
        "You Don't Know JS",
        "Kyle Simpson",
        2015,
        "programming",
        "9781491904244",
    ),
    BookEntity(
        "Git Pocket Guide",
        "Richard E. Silverman",
        2013,
        "programming",
        "9781449325862",
    ),
    BookEntity(
        "Designing Evolvable Web APIs with ASP.NET",
        "Glenn Block, et al.",
        2014,
        "programming",
        "9781449337711",
    ),
)

@Component
class DatabaseSeeder {
    @Autowired
    lateinit var bookRepository: BookRepository

    @EventListener
    @Transactional
    fun seed(event: ContextRefreshedEvent) {
        val bookSeed = bookSeeder()
        if (bookRepository.count() == 0L) bookRepository.saveAll(bookSeed)
    }
}

