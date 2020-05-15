package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, Integer> {
    User findByEmail(String email);

    Boolean existsByEmail(String email);
}
