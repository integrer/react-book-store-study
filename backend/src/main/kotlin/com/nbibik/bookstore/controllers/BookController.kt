package com.nbibik.bookstore.controllers

import com.nbibik.bookstore.service.BookListService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestParam
import org.springframework.web.bind.annotation.RestController

@RestController
class BookController {
  @Autowired
  lateinit var hotelListService: BookListService

  @GetMapping("/books")
  fun hotels(
    @RequestParam(value = "name") name: String?,
    @RequestParam(value = "author") author: String?,
    @RequestParam(value = "genre") genre: String?,
    @RequestParam(value = "yearFrom") yearFrom: Short?,
    @RequestParam(value = "yearTo") yearTo: Short?,
    @RequestParam(value = "page") page: Int?,
    @RequestParam(value = "pageSize") pageSize: Int?,
  ) = hotelListService.getList(
    BookListService.Query(name, author, genre, yearFrom, yearTo),
    BookListService.PageConfig.of(page, pageSize)
  )
}
