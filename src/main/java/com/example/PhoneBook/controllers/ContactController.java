package com.example.PhoneBook.controllers;

import com.example.PhoneBook.entities.Contact;
import com.example.PhoneBook.entities.Group;
import com.example.PhoneBook.exeptions.EntityNotFoundException;
import com.example.PhoneBook.services.abstractions.PhoneServiceAbs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/contacts")
@CrossOrigin(origins="*")
public class ContactController {

    @Autowired
    private PhoneServiceAbs phoneServiceAbs;

    @GetMapping
    public ResponseEntity<Iterable<Contact>> getByNameLike(@RequestParam(required = false) String like) {
        if (like=="") {
            var contacts = phoneServiceAbs.findAllContacts();
            return ResponseEntity.ok(contacts);
        }
        var contacts = phoneServiceAbs.findContactByLastNameLike(like.toLowerCase());
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/favorite")
    public ResponseEntity<Iterable<Contact>> getFavoriteByNameLike(@RequestParam(required = false) String like,
                                                                   boolean favorite) {
        if (like==null) {
            var contacts = phoneServiceAbs.findAllFavoriteContacts(favorite);
            return ResponseEntity.ok(contacts);
        }
        var contacts = phoneServiceAbs.findAllFavoriteContactsByName(like.toLowerCase(), favorite);
        return ResponseEntity.ok(contacts);
    }

    @PostMapping
    public ResponseEntity<Contact> insertContact(@RequestBody Contact contact) {
        Contact newContact = phoneServiceAbs.saveContact(contact);
        Group newGroup = phoneServiceAbs.findGroupById(newContact.getGroup().getId()).orElseThrow();
        contact.setGroup(newGroup);
        return ResponseEntity.ok(newContact);
    }


    @PutMapping("/{id}")
    public Contact update(@PathVariable int id, @RequestBody Contact newContact) throws Exception {

        Contact oldContact = phoneServiceAbs.findContactById(id).orElseThrow();
        oldContact.setFirstName(newContact.getFirstName());
        oldContact.setLastName(newContact.getLastName());
        oldContact.setPhoneNumber(newContact.getPhoneNumber());
        oldContact.setGroup(newContact.getGroup());
        return phoneServiceAbs.saveContact(oldContact);
    }

    @PutMapping("/{id}/set-favorite")
    public Contact setFavorite(@PathVariable int id, @RequestBody Contact newContact) {
        Contact oldContact = phoneServiceAbs.findContactById(id).orElseThrow();
        oldContact.setFavorite(newContact.isFavorite());
        return phoneServiceAbs.saveContact(oldContact);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity deleteContactById(@PathVariable int id) {
        try {
            phoneServiceAbs.deleteById(id);
            return ResponseEntity.noContent().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    @DeleteMapping("/all")
    public String deleteAll() {
        phoneServiceAbs.deleteAllContacts();
        return "ok";
    }
}
