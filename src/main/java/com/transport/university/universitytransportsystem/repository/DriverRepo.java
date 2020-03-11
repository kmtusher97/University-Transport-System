package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Driver;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DriverRepo extends JpaRepository<Driver, Integer> {
}
