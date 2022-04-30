package com.example.PhoneBook.services.abstractions;

import com.example.PhoneBook.entities.Contact;
import com.example.PhoneBook.entities.Group;
import com.example.PhoneBook.exeptions.EntityNotFoundException;

import java.util.Optional;

public interface PhoneServiceAbs {
    Iterable<Contact> findContactByLastNameLike(String like);
    Iterable<Contact> findAllContacts();
    Contact insertContact(Contact contact);
    void deleteById(int id) throws EntityNotFoundException;
    Optional<Group> findGroupById(int id);
    Optional<Contact> findContactById(int id);
    Contact saveContact(Contact contact);
    void deleteAllContacts();
    Iterable<Contact> findAllFavoriteContactsByName(String like, boolean favorite);
    Iterable<Contact> findAllFavoriteContacts(boolean favorite);
}
