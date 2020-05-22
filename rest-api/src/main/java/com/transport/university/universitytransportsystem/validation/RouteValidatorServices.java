package com.transport.university.universitytransportsystem.validation;

import com.transport.university.universitytransportsystem.repository.StoppageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
public class RouteValidatorServices {

    @Autowired
    private StoppageRepo stoppageRepo;

    @Transactional
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

    private Boolean isValidRouteString(String route) {
        int ln = route.length();
        if (route.charAt(0) == ',' || route.charAt(ln - 1) == ',') return false;
        for (int i = 0; i < ln; i++) {
            if (route.charAt(i) >= '0' && route.charAt(i) <= '9') continue;
            if (route.charAt(i) == ',') {
                if (i + 1 < ln && route.charAt(i + 1) == ',') return false;
                continue;
            }
            return false;
        }
        return true;
    }

    public ResponseEntity<?> validateRoute(String route) {
        if (!isValidRouteString(route) || !isValidRoute(route)) {
            Map<String, String> errorMap = new HashMap<>();
            errorMap.put("route", "Invalid route");
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
        return null;
    }
}
