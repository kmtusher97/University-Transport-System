package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepo extends JpaRepository<Schedule, Long> {

}
