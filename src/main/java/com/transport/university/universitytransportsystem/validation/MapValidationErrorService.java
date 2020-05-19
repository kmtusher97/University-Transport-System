package com.transport.university.universitytransportsystem.validation;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

@Service
public class MapValidationErrorService {

    public ResponseEntity<?> mapValidationService(BindingResult result) {
        if (result.hasErrors()) {
            Map<String, String> errorMap = new HashMap<>();
            for (FieldError error : result.getFieldErrors()) {
                errorMap.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
        return null;
    }

    public ResponseEntity<?> mapNullIdErrorService(String idName) {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put(idName, idName + " is required while updating.");
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> invalidEmailPasswordForLogin() {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("username", "Invalid email or password");
        errorMap.put("password", "Invalid email or password");
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<?> notAdminCredentialError() {
        Map<String, String> errorMap = new HashMap<>();
        errorMap.put("username", "Not an Admin Email");
        errorMap.put("password", "Not the password for Admin");
        return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
    }
}
