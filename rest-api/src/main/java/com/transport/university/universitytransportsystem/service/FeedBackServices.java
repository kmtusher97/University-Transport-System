package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.feedback.FeedbackNotFoundException;
import com.transport.university.universitytransportsystem.model.FeedBack;
import com.transport.university.universitytransportsystem.repository.FeedbackRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class FeedBackServices {

    @Autowired
    private FeedbackRepo feedbackRepo;

    public FeedBack saveOrUpdate(FeedBack feedBack) {
        return feedbackRepo.save(feedBack);
    }

    public List<FeedBack> getAll() {
        return feedbackRepo.findAll();
    }

    public void delete(Long id) {
        if (!feedbackRepo.existsById(id)) {
            throw new FeedbackNotFoundException("Feedback with ID: " + id + " doesn't exist");
        }
        feedbackRepo.deleteById(id);
    }
}
