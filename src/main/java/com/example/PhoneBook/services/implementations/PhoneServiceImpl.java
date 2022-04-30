package com.example.PhoneBook.services.implementations;

import com.example.PhoneBook.entities.Contact;
import com.example.PhoneBook.entities.Group;
import com.example.PhoneBook.exeptions.EntityNotFoundException;
import com.example.PhoneBook.repositories.abstractions.ContactRepositoryAbs;
import com.example.PhoneBook.repositories.abstractions.CustomContactRepositoryAbs;
import com.example.PhoneBook.repositories.abstractions.GroupRepository;
import com.example.PhoneBook.services.abstractions.PhoneServiceAbs;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class PhoneServiceImpl implements PhoneServiceAbs {

    private ContactRepositoryAbs contactRepository;
    private CustomContactRepositoryAbs customContactRepository;
    private GroupRepository groupRepository;

    public PhoneServiceImpl(ContactRepositoryAbs contactRepository, CustomContactRepositoryAbs customContactRepository,
                            GroupRepository groupRepository) {
        this.contactRepository = contactRepository;
        this.customContactRepository = customContactRepository;
        this.groupRepository = groupRepository;
    }

    @Override
    public Iterable<Contact> findContactByLastNameLike(String like) {
        return customContactRepository.findByLastName(like);
    }

    public Iterable<Contact> findAllContacts() {
        return contactRepository.findAllByOrderByFavoriteDescFirstNameAscLastNameAsc();
    }

    @Override
    public Contact insertContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void deleteById(int id) throws EntityNotFoundException {
            var optContact = contactRepository.findById(id);
            if (optContact.isEmpty()) {
                throw new EntityNotFoundException(String.format("Il contatto con id %d non esiste", id));
            }
            contactRepository.delete(optContact.get());
        }

    @Override
    public Optional<Group> findGroupById(int id) {
        return groupRepository.findById(id);
    }

    @Override
    public Optional<Contact> findContactById(int id) {
        return contactRepository.findById(id);
    }

    @Override
    public Contact saveContact(Contact contact) {
        return contactRepository.save(contact);
    }

    @Override
    public void deleteAllContacts() {
       contactRepository.deleteAll();
    }

    @Override
    public Iterable<Contact> findAllFavoriteContactsByName(String like, boolean favorite) {
        return customContactRepository.findFavoriteByLastName(like, favorite);
    }

    @Override
    public Iterable<Contact> findAllFavoriteContacts(boolean favorite) {
        return customContactRepository.findFavorite(favorite);
    }
}
