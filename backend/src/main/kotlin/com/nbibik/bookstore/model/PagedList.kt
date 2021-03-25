package com.nbibik.bookstore.model

data class PagedList<out I>(
  val totalPages: Int,
  val currentPage: Int,
  val items: List<I>,
)
