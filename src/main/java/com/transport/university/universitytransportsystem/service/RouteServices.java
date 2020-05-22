package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.exceptions.route.DuplicateRouteException;
import com.transport.university.universitytransportsystem.exceptions.route.RouteIdException;
import com.transport.university.universitytransportsystem.model.Route;
import com.transport.university.universitytransportsystem.model.Stoppage;
import com.transport.university.universitytransportsystem.repository.RouteRepo;
import com.transport.university.universitytransportsystem.repository.StoppageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class RouteServices {

    @Autowired
    private RouteRepo routeRepo;

    @Autowired
    private StoppageRepo stoppageRepo;

    public List<Route> getAllRoutes() {
        List<Route> routeList = routeRepo.findAll();
        if (routeList == null) routeList = new ArrayList<>();
        for (Route route : routeList) {
            route.setRouteDetail(getDetailRouteByRouteId(route.getRouteId()));
        }
        return routeList;
    }

    public Route getRoute(Integer routeId) {
        if (!routeRepo.existsById(routeId)) {
            throw new RouteIdException("Route with Id: " + routeId + " does not exist");
        }
        Route route = routeRepo.getOne(routeId);
        route.setRouteDetail(getDetailRouteByRouteId(routeId));
        return route;
    }

    public Route saveOrUpdate(Route route) {
        try {
            return routeRepo.save(route);
        } catch (Exception ex) {
            throw new DuplicateRouteException("Route: " + route.getRoute() + " already exists");
        }
    }

    public void deleteRoute(Integer routeId) {
        if (!routeRepo.existsById(routeId)) {
            throw new RouteIdException("Route with Id: " + routeId + " does not exist");
        }
        routeRepo.deleteById(routeId);
    }

    public List<Stoppage> getDetailRouteByRouteId(Integer routeId) {
        if (!routeRepo.existsById(routeId)) {
            throw new RouteIdException("Route with Id: " + routeId + " does not exist");
        }
        Route route = routeRepo.getOne(routeId);
        String[] stoppages = route.getRoute().split(",");

        if (stoppages == null) return new ArrayList<>();

        List<Stoppage> stoppageList = new ArrayList<>();
        for (String stoppage : stoppages) {
            Integer stoppageId = Integer.parseInt(stoppage);
            if (!stoppageRepo.existsById(stoppageId)) {
                return new ArrayList<>();
            }
            stoppageList.add(stoppageRepo.getOne(Integer.parseInt(stoppage)));
        }
        return stoppageList;
    }
}
