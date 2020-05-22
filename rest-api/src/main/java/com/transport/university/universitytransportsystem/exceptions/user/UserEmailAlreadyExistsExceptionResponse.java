package com.transport.university.universitytransportsystem.exceptions.user;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserEmailAlreadyExistsExceptionResponse {
    private String email;
}
