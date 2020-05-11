package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.stuff.StuffIdException;
import com.transport.university.universitytransportsystem.model.Stuff;
import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.repository.StuffRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StuffServices {

    @Autowired
    private StuffRepo stuffRepo;

    @Autowired
    private UserServices userServices;

    @Autowired
    private DriverServices driverServices;


    public List<Stuff> getAllStuffsInService() {
        return stuffRepo.findAllInServiceStuffs();
    }

    public List<Stuff> getAllStuffsExService() {
        return stuffRepo.findAllExServiceStuffs();
    }


    public Stuff getStuffById(Integer id) {
        if (!stuffRepo.existsById(id)) {
            throw new StuffIdException("Stuff with Id: " + id + " does not exist");
        }
        return stuffRepo.getOne(id);
    }

    public void removeStuff(Integer stuffId) {
        if (!stuffRepo.existsById(stuffId)) {
            throw new StuffIdException("Stuff with ID: " + stuffId + " does not exist");
        }
        Stuff stuff = stuffRepo.getOne(stuffId);
        stuff.setIsInService(false);
        stuffRepo.save(stuff);
    }
}
