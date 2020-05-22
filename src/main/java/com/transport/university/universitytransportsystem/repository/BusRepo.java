package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Bus;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusRepo extends JpaRepository<Bus, Integer> {

    Bus findByNumber(String number);

    Boolean existsByNumber(String number);
}
