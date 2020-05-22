package com.transport.university.universitytransportsystem.exceptions.announcement;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnnouncementNotFoundExceptionResponse {
    private String announcementId;
}
