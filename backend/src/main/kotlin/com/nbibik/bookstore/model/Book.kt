package com.nbibik.bookstore.model

import com.nbibik.bookstore.entity.BookEntity

data class Book(
  val name: String,
  val author: String,
  val year: Short,
  val genre: String,
) {
  companion object {
    fun from(hotelEntity: BookEntity) = Book(
      hotelEntity.name,
      hotelEntity.author,
      hotelEntity.year,
      hotelEntity.genre,
    )
  }
}
