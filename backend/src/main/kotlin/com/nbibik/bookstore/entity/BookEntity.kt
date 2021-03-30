package com.nbibik.bookstore.entity

import javax.persistence.Entity
import javax.persistence.Table

@Entity
@Table(name = "books")
class BookEntity(
    val name: String,
    val author: String,
    val year: Short,
    val genre: String,
    val isbn: String,
) : BaseEntity<Long>()
