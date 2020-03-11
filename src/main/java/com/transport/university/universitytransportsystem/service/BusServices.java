package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.repository.BusRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class BusServices {

    @Autowired
    private BusRepo busRepo;

    public List<Bus> getAllBuses() {
        return busRepo.findAll();
    }

    public Bus getBusByBusId(Integer busId) {
        if (!busRepo.existsById(busId)) {
            return null;
        }
        return busRepo.getOne(busId);
    }

    public Bus getBusByBusNumber(String busNumber) {
        return busRepo.findByNumber(busNumber);
    }

    public Bus addNewBus(Bus bus) {
        if (bus.getBusId() != null && busRepo.existsById(bus.getBusId())) {
            return busRepo.getOne(bus.getBusId());
        }
        if (bus.getNumber() != null && busRepo.findByNumber(bus.getNumber()) != null) {
            return busRepo.findByNumber(bus.getNumber());
        }
        return busRepo.save(bus);
    }
}
