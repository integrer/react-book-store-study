package com.nbibik.bookstore.service

import com.nbibik.bookstore.dao.BookRepository
import com.nbibik.bookstore.model.Book
import com.nbibik.bookstore.entity.QBookEntity
import com.nbibik.bookstore.model.PagedList
import com.querydsl.core.types.dsl.BooleanExpression
import com.querydsl.core.types.dsl.Expressions
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.domain.PageRequest
import org.springframework.stereotype.Service

@Service
class BookListService {
  @Autowired
  lateinit var repository: BookRepository

  fun getList(query: Query = Query.default, pageConfig: PageConfig = PageConfig.default): PagedList<Book> {
    val pageRequest = PageRequest.of(pageConfig.page, pageConfig.pageSize)
    val page = getPredicateOf(query)?.let { repository.findAll(it, pageRequest) } ?: repository.findAll(pageRequest)
    return PagedList(page.totalPages, pageConfig.page, page.map(Book::from).toList())
  }

  companion object {
    private fun getPredicateOf(query: Query): BooleanExpression? = sequenceOf(
      query.name?.let(QBookEntity.bookEntity.name::equalsIgnoreCase),
      query.author?.let(QBookEntity.bookEntity.author::equalsIgnoreCase),
      query.genre?.let(QBookEntity.bookEntity.genre::equalsIgnoreCase),
      query.yearFrom?.let(QBookEntity.bookEntity.year::goe),
      query.yearTo?.let(QBookEntity.bookEntity.year::lt),
    ).filterNotNull().reduceOrNull { left, right -> left.and(right) }
  }

  data class Query(
    val name: String? = null,
    val author: String? = null,
    val genre: String? = null,
    val yearFrom: Short? = null,
    val yearTo: Short? = null,
  ) {
    companion object {
      val default = Query()
    }
  }

  data class PageConfig(val page: Int = 0, val pageSize: Int = PAGE_SIZE) {
    companion object {
      private const val PAGE_SIZE = 3
      val default = PageConfig()

      fun of(page: Int? = null, pageSize: Int? = null) = PageConfig(page ?: 0, pageSize ?: PAGE_SIZE)
    }
  }
}
