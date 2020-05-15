package com.transport.university.universitytransportsystem.repository;

import com.transport.university.universitytransportsystem.model.Role;
import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.model.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Set;

public interface UserRolesRepo extends JpaRepository<UserRoles, Long> {

    List<UserRoles> findByUser(User user);

    Set<UserRoles> findByRole(Role role);
}
