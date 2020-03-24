package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Route;
import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.service.RouteServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "api/route")
public class RouteController {

    @Autowired
    private RouteServices routeServices;

    @GetMapping("/getAll")
    public List<Route> getAllRoutes() {
        return routeServices.getAllRoutes();
    }

    @GetMapping("/get/{routeId}")
    public Route getRouteById(@PathVariable("routeId") Integer routeId) {
        return routeServices.getRouteById(routeId);
    }

    @PostMapping("/add")
    public Route addRoute(@RequestBody Route route) {
        return routeServices.save(route);
    }

    @PostMapping("/update")
    public Route updateRoute(@RequestBody Route route) {
        return routeServices.update(route);
    }

    @DeleteMapping("/delete/{routeId}")
    public void deleteRouteById(@PathVariable("routeId") Integer routeId) {
        routeServices.deleteRouteById(routeId);
    }


    @GetMapping("/get/{routeId}/detail")
    public List<Stoppage> getDetailRouteByRouteId(@PathVariable("routeId") Integer routeId) {
        return routeServices.getDetailRouteByRouteId(routeId);
    }
}
