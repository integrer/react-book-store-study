package com.nbibik.bookstore.entity

import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class NumberIdentifiedEntity : BaseEntity<Long>() {
    @get:Id
    @get:GeneratedValue(strategy = GenerationType.AUTO)
    override var id: Long = 0
}