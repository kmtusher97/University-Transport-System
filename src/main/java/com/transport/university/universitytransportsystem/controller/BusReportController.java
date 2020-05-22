package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.BusReport;
import com.transport.university.universitytransportsystem.service.BusReportServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/busReport")
public class BusReportController {

    @Autowired
    private BusReportServices busReportServices;

    @Autowired
    private MapValidationErrorService errorService;

    @PostMapping("/DRIVER/add")
    public ResponseEntity<?> addOrUpdate(@Valid @RequestBody BusReport busReport, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(busReportServices.saveOrUpdate(busReport), HttpStatus.CREATED);
    }

    @GetMapping("/DRIVER/{reportId}")
    public BusReport get(@PathVariable("reportId") Long reportId) {
        return busReportServices.get(reportId);
    }

    @DeleteMapping("/{reportId}")
    public ResponseEntity<?> delete(@PathVariable("reportId") Long reportId) {
        busReportServices.delete(reportId);
        return new  ResponseEntity<>("Bus Report with ID: " + reportId + " was deleted", HttpStatus.OK);
    }

    @GetMapping("/markAsSolved/{reportId}")
    public ResponseEntity<?> markAsSolved(@PathVariable("reportId") Long reportId) {
        busReportServices.markAsSolved(reportId);
        return new  ResponseEntity<>("Bus Report with ID: " + reportId + " was marked as solved", HttpStatus.OK);
    }
}
