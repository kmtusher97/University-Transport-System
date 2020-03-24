package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.FeedBack;
import com.transport.university.universitytransportsystem.repository.FeedbackRepo;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class FeedBackServices {

    @Autowired
    private FeedbackRepo feedbackRepo;

    @Autowired
    private UserRepo userRepo;

    private Boolean isValidFeedBack(FeedBack feedBack) {
        if (feedBack.getUser() == null) return false;
        if (feedBack.getFeedbackType() == null) return false;
        if (feedBack.getDescription() == null) return false;
        if (feedBack.getUser().getUserId() == null) return false;
        if (!userRepo.existsById(feedBack.getUser().getUserId())) return false;
        return true;
    }

    public FeedBack saveFeedBack(FeedBack feedBack) {
        if (!isValidFeedBack(feedBack)) return null;
        return feedbackRepo.save(feedBack);
    }

    public FeedBack getFeedBackById(Long id) {
        if (!feedbackRepo.existsById(id)) return null;
        return feedbackRepo.getOne(id);
    }


    public void deleteFeedbackId(Long id) {
        if (feedbackRepo.existsById(id)) {
            feedbackRepo.deleteById(id);
        }
    }

    public List<FeedBack> getNth30FeeBacks(Long n) {
        Long feedBackCount = feedbackRepo.count();
        if (feedBackCount == 0 || n <= 0) return new ArrayList<>();
        return feedbackRepo.getNth30FeeBacks(Math.max(0, feedBackCount - (n * 30)));
    }
}
