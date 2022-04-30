package com.example.PhoneBook.repositories.implementations;

import com.example.PhoneBook.entities.Contact;
import com.example.PhoneBook.repositories.abstractions.CustomContactRepositoryAbs;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

@Repository
@Transactional(readOnly = true)

public class CustomContactRepositoryImpl implements CustomContactRepositoryAbs {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Iterable<Contact> findByLastName(String like) {
        Query query = entityManager.createNativeQuery("SELECT c.* FROM contacts c WHERE c.last_name ILIKE ? ORDER BY " +
                "last_name, favorite", Contact.class);
        query.setParameter(1, "%" + like + "%");
        return query.getResultList();
    }


    @Override
    public Iterable<Contact> findFavoriteByLastName(String like, boolean favorite) {
        Query query = entityManager.createNativeQuery("SELECT c.* FROM contacts c WHERE c.last_name ILIKE ? AND" +
                " c.favorite = ? ORDER BY last_name ", Contact.class);
        query.setParameter(1, "%" + like + "%");
        query.setParameter(2, favorite );
        return query.getResultList();
    }

    @Override
    public Iterable<Contact> findFavorite(boolean favorite) {
        Query query = entityManager.createNativeQuery("SELECT c.* FROM contacts WHERE c.favorite = ? " +
                "ORDER BY last_name ", Contact.class);
        query.setParameter(1, favorite);
        return query.getResultList();
    }
}



