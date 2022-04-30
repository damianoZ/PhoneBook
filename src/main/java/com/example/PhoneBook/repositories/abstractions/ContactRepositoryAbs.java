package com.example.PhoneBook.repositories.abstractions;

import com.example.PhoneBook.entities.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ContactRepositoryAbs extends JpaRepository<Contact, Integer> {
   /* @Query("")
    List<> trovaContarttixCognome(String last);*/
    
    List<Contact> findAllByOrderByFavoriteDescFirstNameAscLastNameAsc();
}

