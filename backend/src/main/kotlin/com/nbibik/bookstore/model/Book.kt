package com.nbibik.bookstore.model

import com.nbibik.bookstore.entity.BookEntity

data class Book(
  val id: Long,
  val name: String,
  val author: String,
  val year: Short,
  val genre: String,
  val isbn: String,
) {
  companion object {
    fun from(bookEntity: BookEntity) = Book(
      requireNotNull(bookEntity.id) { "id of $bookEntity should be initialized" },
      bookEntity.name,
      bookEntity.author,
      bookEntity.year,
      bookEntity.genre,
      bookEntity.isbn,
    )
  }
}
