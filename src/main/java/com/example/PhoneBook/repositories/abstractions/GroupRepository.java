package com.example.PhoneBook.repositories.abstractions;

import com.example.PhoneBook.entities.Group;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group,Integer> {
    List<Group> findAllByOrderById();
}
