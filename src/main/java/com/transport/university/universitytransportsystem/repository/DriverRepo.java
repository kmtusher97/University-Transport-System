package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface DriverRepo extends JpaRepository<Driver, Integer> {

    @Query("SELECT d FROM Driver d WHERE d.isInService = true")
    List<Driver> findAllInServiceDrivers();

    @Query("SELECT d FROM Driver d WHERE d.isInService = false")
    List<Driver> findAllExServiceDrivers();

    Boolean existsByUser(User user);
}
