package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.requisition.RequisitionNotFoundException;
import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.model.Requisition;
import com.transport.university.universitytransportsystem.repository.BusRepo;
import com.transport.university.universitytransportsystem.repository.RequisitionRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
public class RequisitionServices {

    @Autowired
    private RequisitionRepo requisitionRepo;

    @Autowired
    private NotificationServices notificationServices;

    @Autowired
    private BusRepo busRepo;


    public Requisition saveOrUpdate(Requisition requisition) {
        notificationServices.generateNotificationAboutRequisition(requisition);
        return requisitionRepo.save(requisition);
    }

    public List<Requisition> getAll() {
        return requisitionRepo.findAll();
    }

    public List<Requisition> getAllActiveRequisitions() {
        return requisitionRepo.findByIsExpired(false);
    }

    public Requisition get(Long requisitionId) {
        if (!requisitionRepo.existsById(requisitionId)) {
            throw new RequisitionNotFoundException("Requisition with ID: " + requisitionId + " doesn't exist");
        }
        return requisitionRepo.getOne(requisitionId);
    }

    public void delete(Long requisitionId) {
        if (!requisitionRepo.existsById(requisitionId)) {
            throw new RequisitionNotFoundException("Requisition with ID: " + requisitionId + " doesn't exist");
        }
        Requisition requisition = requisitionRepo.getOne(requisitionId);
        Bus bus = requisition.getBus();
        bus.setIsAvailable(true);
        busRepo.save(bus);
        requisitionRepo.deleteById(requisitionId);
    }
}
