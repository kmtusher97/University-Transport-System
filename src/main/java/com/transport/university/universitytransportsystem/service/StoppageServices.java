package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.repository.StoppageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class StoppageServices {
    @Autowired
    private StoppageRepo stoppageRepo;

    public Stoppage save(Stoppage stoppage) {
        return stoppageRepo.save(stoppage);
    }

    public List<Stoppage> getAllStoppage() {
        return stoppageRepo.findAll();
    }

    public Stoppage getStoppageByName(String stoppageName) {
        if (stoppageName == null) return null;
        if (!stoppageRepo.existsByStoppageName(stoppageName)) return null;
        return stoppageRepo.findByStoppageName(stoppageName);
    }

    public Stoppage getStoppageById(Integer stoppageId) {
        if (stoppageId == null) return null;
        return stoppageRepo.getOne(stoppageId);
    }

    public void deleteStoppageById(Integer stoppageId) {
        if (stoppageId == null) return;
        if (!stoppageRepo.existsById(stoppageId)) return;
        stoppageRepo.deleteById(stoppageId);
    }
}
