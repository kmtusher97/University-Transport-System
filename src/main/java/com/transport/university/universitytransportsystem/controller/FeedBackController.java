package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.service.FeedBackServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


@CrossOrigin
@RestController
@RequestMapping("api/feedback")
public class FeedBackController {

    @Autowired
    private FeedBackServices feedBackServices;


}
