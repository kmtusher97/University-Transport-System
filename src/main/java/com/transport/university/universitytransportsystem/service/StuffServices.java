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

    public Stuff addNewStuff(Integer userId) {
        if (!userServices.isValidUser(userId)) {
            return null;
        }
        User user = userServices.getUserByUserId(userId);
        driverServices.removerDriverByUser(user);
        if (stuffRepo.existsByUser(userServices.getUserByUserId(userId))) {
            return reEmployStuff(stuffRepo.findByUser(user).getStuffId());
        }
        Stuff stuff = new Stuff();
        stuff.setUser(user);
        stuff.setRating(0);
        stuff.setIsInService(true);
        return stuffRepo.save(stuff);
    }

    public Stuff removeStuff(Integer stuffId) {
        if (!stuffRepo.existsById(stuffId)) {
            return null;
        }
        Stuff stuff = stuffRepo.getOne(stuffId);
        stuff.setIsInService(false);
        return stuffRepo.save(stuff);
    }

    public Stuff removerStuffByUser(User user) {
        if (stuffRepo.existsByUser(user)) {
            Stuff stuff = stuffRepo.findByUser(user);
            return removeStuff(stuff.getStuffId());
        }
        return null;
    }

    public Stuff reEmployStuff(Integer stuffId) {
        if (stuffRepo.existsById(stuffId)) {
            Stuff stuff = stuffRepo.getOne(stuffId);
            stuff.setIsInService(true);
            return stuffRepo.save(stuff);
        }
        return null;
    }

    public Stuff getStuffById(Integer id) {
        if (!stuffRepo.existsById(id)) {
            throw new StuffIdException("Stuff with Id: " + id + " does not exist");
        }
        return stuffRepo.getOne(id);
    }
}
