package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FeedBack {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long feedbackId;

    @NotBlank(message = "Description is required")
    private String description;

    @Column(columnDefinition = "boolean default true")
    private Boolean feedbackType;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false)
    private User user;
}
