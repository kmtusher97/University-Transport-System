package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.Route;
import com.transport.university.universitytransportsystem.service.RouteServices;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import com.transport.university.universitytransportsystem.validation.RouteValidatorServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin
@RestController
@RequestMapping(path = "api/route")
public class RouteController {

    @Autowired
    private RouteServices routeServices;

    @Autowired
    private MapValidationErrorService errorService;

    @Autowired
    private RouteValidatorServices routeValidatorServices;

    @PostMapping("/add")
    public ResponseEntity<?> addRoute(@Valid @RequestBody Route route, BindingResult result) {
        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;
        errorMap = routeValidatorServices.validateRoute(route.getRoute());
        if (errorMap != null) return errorMap;
        return new ResponseEntity<>(routeServices.saveOrUpdate(route), HttpStatus.CREATED);
    }

    @GetMapping("/GLOBAL/all")
    public List<Route> getAllRoutes() {
        return routeServices.getAllRoutes();
    }

    @GetMapping("/GLOBAL/{routeId}")
    public ResponseEntity<?> getRoute(@PathVariable("routeId") Integer routeId) {
        return new ResponseEntity<>(routeServices.getRoute(routeId), HttpStatus.OK);
    }

    @DeleteMapping("/{routeId}")
    public ResponseEntity<?> deleteRouteById(@PathVariable("routeId") Integer routeId) {
        routeServices.deleteRoute(routeId);
        return new ResponseEntity<>("Route with ID: " + routeId + " was deleted", HttpStatus.OK);
    }

    @GetMapping("/GLOBAL/{routeId}/detail")
    public ResponseEntity<?> getDetailRouteByRouteId(@PathVariable("routeId") Integer routeId) {
        return new ResponseEntity<>(routeServices.getDetailRouteByRouteId(routeId), HttpStatus.OK);
    }
}
