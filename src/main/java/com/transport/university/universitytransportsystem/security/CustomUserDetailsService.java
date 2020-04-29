package com.transport.university.universitytransportsystem.security;

import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.model.UserRoles;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import com.transport.university.universitytransportsystem.repository.UserRolesRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
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
}
