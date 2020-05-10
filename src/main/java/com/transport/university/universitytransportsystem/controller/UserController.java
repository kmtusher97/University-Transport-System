package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.security.CustomUserDetailsService;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/user")
public class UserController {

    @Autowired
    private MapValidationErrorService errorService;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@Valid @RequestBody User user, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(userDetailsService.registerNewUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/register/driver")
    public ResponseEntity<?> registerNewDriver(@Valid @RequestBody User user, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(userDetailsService.registerNewDriver(user), HttpStatus.CREATED);
    }

    @PostMapping("/register/stuff")
    public ResponseEntity<?> registerNewStuff(@Valid @RequestBody User user, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        return new ResponseEntity<>(userDetailsService.registerNewStuff(user), HttpStatus.CREATED);
    }
}
