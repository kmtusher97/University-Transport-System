package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.BusReport;
import com.transport.university.universitytransportsystem.service.BusReportServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "/api/busReport")
public class BusReportController {

    @Autowired
    private BusReportServices busReportServices;

    @GetMapping("/getAll")
    public List<BusReport> getAllBusReport() {
        return busReportServices.getAllBusReport();
    }

    @PostMapping("/DRIVER/add")
    public BusReport addBusReport(@RequestBody BusReport busReport) {
        return busReportServices.addBusReport(busReport);
    }

    @GetMapping("/getByBusId/{busId}")
    public List<BusReport> getBusReportByBusId(@PathVariable("busId") Integer busId) {
        return busReportServices.getBusReportByBusId(busId);
    }

    @PostMapping("/getByDateInterval")
    public List<BusReport> getBusReportsByDate(@RequestBody List<Date> dates) {
        if (dates == null || dates.size() != 2) return null;
        Date startDate = dates.get(0);
        Date endDate = dates.get(1);
        if (startDate.compareTo(endDate) == 1) return null;
        return busReportServices.getBusReportsByDateInterval(startDate, endDate);
    }

    @DeleteMapping("/delete/{reportId}")
    public void deleteReportById(@PathVariable("reportId") Long reportId) {
        busReportServices.deleteByBusReportId(reportId);
    }
}
