package com.nbibik.bookstore.model

import com.nbibik.bookstore.entity.BookEntity

data class Book(
  val id: Long,
  val name: String,
  val author: String,
  val year: Short,
  val genre: String,
) {
  companion object {
    fun from(hotelEntity: BookEntity) = Book(
      requireNotNull(hotelEntity.id) { "id of $hotelEntity should be initialized" },
      hotelEntity.name,
      hotelEntity.author,
      hotelEntity.year,
      hotelEntity.genre,
    )
  }
}
