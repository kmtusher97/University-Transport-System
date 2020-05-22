package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Stuff;
import com.transport.university.universitytransportsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface StuffRepo extends JpaRepository<Stuff, Integer> {

    @Query("SELECT s FROM Stuff s WHERE s.isInService = true")
    List<Stuff> findAllInServiceStuffs();

    @Query("SELECT s FROM Stuff s WHERE s.isInService = false")
    List<Stuff> findAllExServiceStuffs();

    Boolean existsByUser(User user);

    Stuff findByUser(User user);
}
