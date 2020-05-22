package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.busReport.BusReportIdException;
import com.transport.university.universitytransportsystem.model.BusReport;
import com.transport.university.universitytransportsystem.repository.BusReportRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class BusReportServices {

    @Autowired
    private BusReportRepo busReportRepo;

    public BusReport saveOrUpdate(BusReport busReport) {
        if (busReport.getSolved() == null) busReport.setSolved(false);
        return busReportRepo.save(busReport);
    }

    public void delete(Long reportId) {
        if (!busReportRepo.existsById(reportId)) {
            throw new BusReportIdException("Bus Report with ID: " + reportId + " does not exist");
        }
        busReportRepo.deleteById(reportId);
    }

    public BusReport get(Long reportId) {
        if (!busReportRepo.existsById(reportId)) {
            throw new BusReportIdException("Bus Report with ID: " + reportId + " does not exist");
        }
        return busReportRepo.getOne(reportId);
    }

    public void markAsSolved(Long reportId) {
        if (!busReportRepo.existsById(reportId)) {
            throw new BusReportIdException("Bus Report with ID: " + reportId + " does not exist");
        }
        BusReport report = busReportRepo.getOne(reportId);
        report.setSolved(true);
        busReportRepo.save(report);
    }
}
