package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Stuff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StuffRepo extends JpaRepository<Stuff, Integer> {
}
