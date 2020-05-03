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

}
