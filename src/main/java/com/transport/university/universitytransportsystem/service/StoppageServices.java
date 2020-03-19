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

    public Boolean isValid(Stoppage stoppage) {
        if (stoppage.getStoppageName() == null) return false;
        if (stoppage.getLatitude() == null) return false;
        if (stoppage.getLongitude() == null) return false;
        return true;
    }

    public Stoppage save(Stoppage stoppage) {
        if (!isValid(stoppage)) return null;
        if (stoppageRepo.existsByStoppageName(stoppage.getStoppageName())) return null;
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

    public Stoppage updateStoppage(Stoppage stoppage) {
        if (stoppage.getStoppageId() == null ||
                !stoppageRepo.existsById(stoppage.getStoppageId())) return null;
        if (!isValid(stoppage)) return null;
        Stoppage tmpStoppage = stoppageRepo.getOne(stoppage.getStoppageId());
        if (stoppage.getStoppageName().equals(tmpStoppage.getStoppageName())) {
            return stoppageRepo.save(stoppage);
        }
        stoppageRepo.save(tmpStoppage);
        return null;
    }
}
