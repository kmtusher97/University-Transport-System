package com.transport.university.universitytransportsystem.controller;

import com.transport.university.universitytransportsystem.model.jwt.AuthenticationRequest;
import com.transport.university.universitytransportsystem.model.jwt.AuthenticationResponse;
import com.transport.university.universitytransportsystem.security.JWTUtility;
import com.transport.university.universitytransportsystem.security.CustomUserDetailsService;
import com.transport.university.universitytransportsystem.validation.MapValidationErrorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@CrossOrigin
@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private MapValidationErrorService errorService;


    @PostMapping("/api/login")
    public ResponseEntity<?> createAuthenticationToken(
            @Valid @RequestBody AuthenticationRequest authenticationRequest, BindingResult result) throws Exception {

        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return errorService.invalidEmailPasswordForLogin();
        }

        final UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        final String jwtToken = jwtUtility.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwtToken));
    }

    @PostMapping("/api/admin/login")
    public ResponseEntity<?> createAuthenticationTokenForAdmin(
            @Valid @RequestBody AuthenticationRequest authenticationRequest, BindingResult result) throws Exception {

        ResponseEntity<?> errorMap = errorService.mapValidationService(result);
        if (errorMap != null) return errorMap;

        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authenticationRequest.getUsername(),
                            authenticationRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException e) {
            return errorService.invalidEmailPasswordForLogin();
        }

        final UserDetails userDetails = customUserDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());

        Boolean isAdmin = false;
        if (userDetails.getAuthorities() != null) {
            for (GrantedAuthority authority: userDetails.getAuthorities()) {
                if (authority.getAuthority().equals("ROLE_ADMIN")) {
                    isAdmin = true;
                    break;
                }
            }
        }
        if (!isAdmin) {
            return errorService.notAdminCredentialError();
        }

        final String jwtToken = jwtUtility.generateToken(userDetails);

        return ResponseEntity.ok(new AuthenticationResponse(jwtToken));
    }
}
