package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Requisition;
import com.transport.university.universitytransportsystem.service.RequisitionServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import com.transport.university.universitytransportsystem.validation.RequisitionValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/requisition")
public class RequisitionController {

    @Autowired
    private RequisitionServices requisitionServices;

    @Autowired
    private MapValidationErrorService errorService;

    @Autowired
    private RequisitionValidator requisitionValidator;


    @PostMapping("/add")
    public ResponseEntity<?> create(@Valid @RequestBody Requisition requisition, BindingResult result) {
        requisitionValidator.validate(requisition, result);
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(requisitionServices.saveOrUpdate(requisition), HttpStatus.CREATED);
    }

    @GetMapping("/all")
    public List<Requisition> getAll() {
        return requisitionServices.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getOne(@PathVariable("id") Long id) {
        return new ResponseEntity<>(requisitionServices.get(id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable("id") Long id) {
        requisitionServices.delete(id);
        return new ResponseEntity<>("Requisition with ID: " + id + " was delete", HttpStatus.OK);
    }
}
