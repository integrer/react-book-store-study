package com.nbibik.bookstore.entity

import java.io.Serializable
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class BaseEntity<TID : Serializable> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: TID? = null
}