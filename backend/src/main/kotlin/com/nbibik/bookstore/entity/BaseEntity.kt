package com.nbibik.bookstore.entity

import java.io.Serializable
import javax.persistence.Id
import javax.persistence.MappedSuperclass

@MappedSuperclass
abstract class BaseEntity<TID : Serializable> {
    @get:Id
    abstract var id: TID
}