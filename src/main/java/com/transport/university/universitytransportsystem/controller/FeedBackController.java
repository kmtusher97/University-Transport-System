package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.FeedBack;
import com.transport.university.universitytransportsystem.service.FeedBackServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackServices feedBackServices;

    @PostMapping("/add")
    public FeedBack addFeedBack(@RequestBody FeedBack feedBack) {
        return feedBackServices.saveFeedBack(feedBack);
    }

    @GetMapping("/getById/{id}")
    public FeedBack getFeedBackById(@PathVariable("id") Long id) {
        return feedBackServices.getFeedBackById(id);
    }


    @DeleteMapping("/delete/{id}")
    public void deleteFeedbackId(@PathVariable("id") Long id) {
        feedBackServices.deleteFeedbackId(id);
    }

    @GetMapping("/getAll/{n}")
    public List<FeedBack> getNth30FeeBacks(@PathVariable("n") Long n) {
        return feedBackServices.getNth30FeeBacks(n);
    }
}
