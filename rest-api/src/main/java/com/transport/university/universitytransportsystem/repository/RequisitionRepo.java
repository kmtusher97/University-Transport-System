package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Requisition;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RequisitionRepo extends JpaRepository<Requisition, Long> {

    List<Requisition> findByIsExpired(boolean value);
}
