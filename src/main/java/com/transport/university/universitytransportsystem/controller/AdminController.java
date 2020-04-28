package com.transport.university.universitytransportsystem.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@Controller
public class AdminController {

    @GetMapping(value = {
            "/",
            "/schedule",
            "/schedule/**",
            "/bus",
            "/bus/**",
            "/stoppage",
            "/stoppage/**",
            "/route",
            "/route/**",
            "/feedback",
            "/feedback/**",
            "/notice",
            "/notice/**"
    })
    public String adminApp() {
        return "/index.html";
    }
}
