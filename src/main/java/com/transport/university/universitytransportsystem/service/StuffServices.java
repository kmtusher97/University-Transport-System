package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Stuff;
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
        if (stuffRepo.existsByUser(userServices.getUserByUserId(userId))) {
            return null;
        }
        Stuff stuff = new Stuff();
        stuff.setUser(userServices.getUserByUserId(userId));
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
        userServices.blockUser(stuff.getUser().getUserId());
        return stuffRepo.save(stuff);
    }

    public Stuff reEmployStuff(Integer stuffId) {
        if (stuffRepo.existsById(stuffId)) {
            Stuff stuff = stuffRepo.getOne(stuffId);
            stuff.setIsInService(true);
            userServices.unblockUser(stuff.getUser().getUserId());
            return stuffRepo.save(stuff);
        }
        return null;
    }
}
