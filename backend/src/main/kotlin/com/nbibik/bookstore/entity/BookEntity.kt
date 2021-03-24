package com.nbibik.bookstore.entity

import javax.persistence.Column
import javax.persistence.Entity
import javax.persistence.Table
import kotlin.properties.Delegates

@Entity
@Table(name = "books")
class BookEntity : NumberIdentifiedEntity() {
    @get:Column(nullable = false)
    lateinit var name: String

    @get:Column(nullable = false)
    lateinit var author: String

    @get:Column(nullable = false)
    var year by Delegates.notNull<Short>()

    @get:Column(nullable = false)
    lateinit var genre: String
}