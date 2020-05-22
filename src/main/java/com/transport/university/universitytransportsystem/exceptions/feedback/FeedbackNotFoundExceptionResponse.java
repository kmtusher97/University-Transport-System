package com.transport.university.universitytransportsystem.exceptions.feedback;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FeedbackNotFoundExceptionResponse {
    private String feedbackId;
}
