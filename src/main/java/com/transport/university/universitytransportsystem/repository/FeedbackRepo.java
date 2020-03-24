package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.FeedBack;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface FeedbackRepo extends JpaRepository<FeedBack, Long> {

    @Query(value = "SELECT * FROM feed_back LIMIT 30 OFFSET ?1", nativeQuery = true)
    List<FeedBack> getNth30FeeBacks(long fromRow);
}
