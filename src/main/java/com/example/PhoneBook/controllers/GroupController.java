package com.example.PhoneBook.controllers;

import com.example.PhoneBook.repositories.abstractions.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/groups")
@CrossOrigin(origins="*")
public class GroupController {

    @Autowired
    private GroupRepository groupRepository;

    @GetMapping
    public ResponseEntity getGroups() {
            var groups = groupRepository.findAllByOrderById();
            return ResponseEntity.ok(groups);
        }
}
