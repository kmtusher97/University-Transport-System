package com.transport.university.universitytransportsystem.security;

import com.transport.university.universitytransportsystem.exceptions.user.UserEmailAlreadyExistsException;
import com.transport.university.universitytransportsystem.model.Driver;
import com.transport.university.universitytransportsystem.model.Stuff;
import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.model.UserRoles;
import com.transport.university.universitytransportsystem.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserRolesRepo userRolesRepo;

    @Autowired
    private RoleRepo roleRepo;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private DriverRepo driverRepo;

    @Autowired
    private StuffRepo stuffRepo;


    @Transactional
    private User getUserByEmail(String email) {
        return userRepo.findByEmail(email);
    }

    private Collection<? extends GrantedAuthority> getAuthorities(List<UserRoles> userRolesList) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (UserRoles userRoles : userRolesList) {
            authorities.add(new SimpleGrantedAuthority(userRoles.getRole().getRoleName()));
        }
        return authorities;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User userFromDB = getUserByEmail(email);
        if (userFromDB == null) {
            throw new UsernameNotFoundException(email);
        }
        return new org.springframework.security.core.userdetails.User(
                userFromDB.getEmail(),
                userFromDB.getPassword(),
                !userFromDB.getIsBlocked(),
                true,
                true,
                true,
                getAuthorities(userRolesRepo.findByUser(userFromDB))
        );
    }

    @Transactional
    public User registerNewUser(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            User savedUser = userRepo.save(newUser);
            UserRoles userRole = new UserRoles(null, savedUser, roleRepo.getOne(2)); // role 2 = ROLE_USER
            userRolesRepo.save(userRole);
            return savedUser;
        } catch (Exception ex) {
            throw new UserEmailAlreadyExistsException(newUser.getEmail() + " already registered");
        }
    }

    @Transactional
    public Driver registerNewDriver(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            User savedUser = userRepo.save(newUser);
            UserRoles userRole = new UserRoles(null, savedUser, roleRepo.getOne(3)); // role 3 = ROLE_DRIVER
            userRolesRepo.save(userRole);

            Driver newDriver = new Driver();
            newDriver.setIsInService(true);
            newDriver.setRating(0);
            newDriver.setUser(savedUser);
            return driverRepo.save(newDriver);

        } catch (Exception ex) {
            throw new UserEmailAlreadyExistsException(newUser.getEmail() + " already registered");
        }
    }

    @Transactional
    public Stuff registerNewStuff(User newUser) {
        try {
            newUser.setPassword(bCryptPasswordEncoder.encode(newUser.getPassword()));
            User savedUser = userRepo.save(newUser);
            UserRoles userRole = new UserRoles(null, savedUser, roleRepo.getOne(4)); // role 3 = ROLE_STUFF
            userRolesRepo.save(userRole);

            Stuff newStuff = new Stuff();
            newStuff.setIsInService(true);
            newStuff.setRating(0);
            newStuff.setUser(savedUser);
            return stuffRepo.save(newStuff);

        } catch (Exception ex) {
            throw new UserEmailAlreadyExistsException(newUser.getEmail() + " already registered");
        }
    }
}
