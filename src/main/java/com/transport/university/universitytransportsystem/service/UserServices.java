package com.transport.university.universitytransportsystem.service;

import com.transport.university.universitytransportsystem.model.User;
import com.transport.university.universitytransportsystem.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class UserServices {

    @Autowired
    private UserRepo userRepo;

    public boolean isValidUser(Integer userId) {
        if (userId == null || !userRepo.existsById(userId)) return false;
        User user = userRepo.getOne(userId);
        return user.getIsBlocked() == false;
    }

    public User getUserByUserId(Integer userId) {
        return userRepo.getOne(userId);
    }

    public User blockUser(Integer userId) {
        if (userRepo.existsById(userId)) {
            User user = userRepo.getOne(userId);
            user.setIsBlocked(true);
            return userRepo.save(user);
        }
        return null;
    }

    public User unblockUser(Integer userId) {
        if (userRepo.existsById(userId)) {
            User user = userRepo.getOne(userId);
            user.setIsBlocked(false);
            return userRepo.save(user);
        }
        return null;
    }
}
