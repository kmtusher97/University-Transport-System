package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Date;
import java.util.List;

public interface AssignmentRepo extends JpaRepository<Schedule, Long> {


    @Query("SELECT a FROM Assignment a WHERE a.date >= ?1 AND a.date <= ?2")
    List<Schedule> getAllByDateRange(Date startDate, Date endDate);

    @Query(value = "SELECT * FROM assignment LIMIT 30 OFFSET ?1", nativeQuery = true)
    List<Schedule> getNth30SchedulesFromLast(Long fromRow);
}
