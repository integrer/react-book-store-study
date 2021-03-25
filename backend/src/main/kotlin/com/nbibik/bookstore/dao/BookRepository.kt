package com.nbibik.bookstore.dao

import com.nbibik.bookstore.entity.BookEntity
import com.nbibik.bookstore.entity.QBookEntity
import org.springframework.stereotype.Repository

@Repository
interface BookRepository : BaseRepository<BookEntity, QBookEntity, Long>
