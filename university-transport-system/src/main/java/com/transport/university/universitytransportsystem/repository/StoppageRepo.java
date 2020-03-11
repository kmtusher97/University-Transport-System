package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Stoppage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StoppageRepo extends JpaRepository<Stoppage, Integer> {
}
