package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.model.BusReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface BusReportRepo extends JpaRepository<BusReport, Long> {
}
