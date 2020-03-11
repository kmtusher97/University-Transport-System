package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FeedbackRepo extends JpaRepository<FeedBack, Long> {
}
