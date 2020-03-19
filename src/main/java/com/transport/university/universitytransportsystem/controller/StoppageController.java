package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.service.StoppageServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/stoppage")
public class StoppageController {

    @Autowired
    private StoppageServices stoppageServices;

    @PostMapping("/add")
    public Stoppage addStoppage(@RequestBody Stoppage stoppage) {
        return stoppageServices.save(stoppage);
    }

    @GetMapping("/getAll")
    public List<Stoppage> getAllStoppage() {
        return stoppageServices.getAllStoppage();
    }

    @GetMapping("/get/{stoppageId}")
    public Stoppage getStoppageById(@PathVariable("stoppageId") Integer stoppageId) {
        return stoppageServices.getStoppageById(stoppageId);
    }

    @GetMapping("/getByName/{stoppageName}")
    public Stoppage getStoppageByName(@PathVariable("stoppageName") String stoppageName) {
        return stoppageServices.getStoppageByName(stoppageName);
    }

    @DeleteMapping("/delete/{stoppageId}")
    public void deleteStoppage(@PathVariable("stoppageId") Integer stoppageId) {
        stoppageServices.deleteStoppageById(stoppageId);
    }

    @PostMapping("/update")
    public Stoppage updateStoppage(@RequestBody Stoppage stoppage) {
        return stoppageServices.updateStoppage(stoppage);
    }
}
