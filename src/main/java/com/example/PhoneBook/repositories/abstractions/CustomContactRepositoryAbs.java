package com.example.PhoneBook.repositories.abstractions;

import com.example.PhoneBook.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomContactRepositoryAbs {
    Iterable<Contact> findByLastName(String like);
    Iterable<Contact> findFavoriteByLastName(String like, boolean favorite);
    Iterable<Contact> findFavorite(boolean favorite);
}
