package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.BusReport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusReportRepo extends JpaRepository<BusReport, Long> {
}
