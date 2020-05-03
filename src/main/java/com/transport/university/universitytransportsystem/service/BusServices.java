package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.bus.BusIdException;
import com.transport.university.universitytransportsystem.exceptions.bus.BusNumberException;
import com.transport.university.universitytransportsystem.model.Bus;
import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.model.Schedule;
import com.transport.university.universitytransportsystem.repository.BusRepo;
import com.transport.university.universitytransportsystem.repository.DriverRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Set;

@Service
@Transactional
public class BusServices {

    @Autowired
    private BusRepo busRepo;

    @Autowired
    private DriverRepo driverRepo;

    public Bus addNewBus(Bus bus) {
        try {
            bus.setNumber(bus.getNumber().toUpperCase());
            return busRepo.save(bus);
        } catch (Exception e) {
            throw new BusNumberException("Bus with number: " + bus.getNumber() + " already exists");
        }
    }

    public List<Bus> getAllBuses() {
        return busRepo.findAll();
    }

    public Bus getBusByBusId(Integer busId) {
        if (!busRepo.existsById(busId)) {
            throw new BusIdException("Bus ID " + busId + " does not exits");
        }
        return busRepo.getOne(busId);
    }

    public Bus getBusByBusNumber(String busNumber) {
        if (!busRepo.existsByNumber(busNumber)) {
            throw new BusNumberException("Bus number " + busNumber + " does not exits");
        }
        return busRepo.findByNumber(busNumber);
    }

    public void deleteBusByBusId(Integer busId) {
        if (!busRepo.existsById(busId)) {
            throw new BusIdException("Bus ID " + busId + " does not exits");
        }
        busRepo.deleteById(busId);
    }

    public Bus updateBus(Bus bus) {
        if (bus.getBusId() == null || !busRepo.existsById(bus.getBusId())) {
            return null;
        }
        if (bus.getNumber().equals(busRepo.getOne(bus.getBusId()).getNumber()) == false) {
            return null;
        }
        return busRepo.save(bus);
    }

    public Bus markBusAsFinishedTrip(Integer busId, Integer driverId) {
        if (!busRepo.existsById(busId)) return null;
        if (!driverRepo.existsById(driverId)) return null;
        Driver driver = driverRepo.getOne(driverId);
        if (driver.getIsInService() == false) return null;
        Bus bus = busRepo.getOne(busId);
        bus.setIsAvailable(true);
        return updateBus(bus);
    }

    public Set<Schedule> getSchedules(Integer busId) {
        if (!busRepo.existsById(busId)) {
            throw new BusIdException("Bus ID " + busId + " does not exits");
        }
        return busRepo.getOne(busId).getSchedules();
    }
}
