package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.*;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepo extends JpaRepository<Schedule, Long> {

    List<Schedule> findByBus(Bus bus, Sort sort);

    List<Schedule> findByRoute(Route route, Sort sort);

    List<Schedule> findByDriver(Driver driver, Sort sort);

    List<Schedule> findByStuff(Stuff stuff, Sort sort);
}
