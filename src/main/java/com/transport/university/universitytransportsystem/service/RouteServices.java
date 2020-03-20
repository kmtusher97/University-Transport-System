package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.Route;
import com.transport.university.universitytransportsystem.repository.RouteRepo;
import com.transport.university.universitytransportsystem.repository.StoppageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class RouteServices {

    @Autowired
    private RouteRepo routeRepo;

    @Autowired
    private StoppageRepo stoppageRepo;

    public List<Route> getAllRoutes() {
        return routeRepo.findAll();
    }

    public Route getRouteById(Integer routeId) {
        if (!routeRepo.existsById(routeId)) return null;
        return routeRepo.getOne(routeId);
    }

    private Boolean isValidRoute(String route) {
        String[] stoppages = route.split(",");
        if (stoppages == null || stoppages.length == 0) return false;
        for (String stoppage : stoppages) {
            if (!stoppageRepo.existsById(Integer.parseInt(stoppage))) {
                return false;
            }
        }
        return true;
    }

    public Route save(Route route) {
        if (route.getRoute() == null) return null;
        if (!isValidRoute(route.getRoute())) return null;
        return routeRepo.save(route);
    }

    public Route update(Route route) {
        if (route.getRouteId() == null || !routeRepo.existsById(route.getRouteId())) return null;
        return save(route);
    }

    public void deleteRouteById(Integer routeId) {
        if (routeId == null || !routeRepo.existsById(routeId)) return;
        routeRepo.deleteById(routeId);
    }
}
