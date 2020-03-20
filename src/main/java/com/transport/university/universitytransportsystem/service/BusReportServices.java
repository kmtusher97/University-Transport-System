package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.model.BusReport;
import com.transport.university.universitytransportsystem.repository.BusRepo;
import com.transport.university.universitytransportsystem.repository.BusReportRepo;
import com.transport.university.universitytransportsystem.repository.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Service
@Transactional
public class BusReportServices {

    @Autowired
    private BusReportRepo busReportRepo;

    @Autowired
    private BusRepo busRepo;

    @Autowired
    private DriverRepo driverRepo;


    private Boolean isValid(BusReport busReport) {
        if (busReport.getDate() == null) return false;
        if (busReport.getReport() == null) return false;
        if (busReport.getBus().getBusId() == null) return false;
        if (busReport.getDriver().getDriverId() == null) return false;
        if (!busRepo.existsById(busReport.getBus().getBusId())) return false;
        if (!driverRepo.existsById(busReport.getDriver().getDriverId())) return false;
        return true;
    }

    public BusReport addBusReport(BusReport busReport) {
        if (!isValid(busReport)) return null;
        busReport.setBus(busRepo.getOne(busReport.getBus().getBusId()));
        busReport.setDriver(driverRepo.getOne(busReport.getDriver().getDriverId()));
        return busReportRepo.save(busReport);
    }

    public List<BusReport> getBusReportByBusId(Integer busId) {
        if (!busRepo.existsById(busId)) return null;
        Bus bus = busRepo.getOne(busId);
        return busReportRepo.findByBus(bus);
    }

    public List<BusReport> getBusReportsByDateInterval(Date startDate, Date endDate) {
        return busReportRepo.getBusReportsByDateInterval(startDate, endDate);
    }

    public void deleteByBusReportId(Long reportId) {
        if (busReportRepo.existsById(reportId)) {
            busReportRepo.deleteById(reportId);
        }
    }

    public List<BusReport> getAllBusReport() {
        return busReportRepo.findAll();
    }
}
