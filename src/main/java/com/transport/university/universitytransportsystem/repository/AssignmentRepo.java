package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AssignmentRepo extends JpaRepository<Assignment, Long> {
}
