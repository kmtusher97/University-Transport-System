package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
public class Requisition {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long requisitionId;

    @NotNull(message = "startDateTime is required")
    private Date startDateTime;

    @NotNull(message = "endDateTime is required")
    private Date endDateTime;

    @NotNull(message = "isExpired is required")
    private Boolean isExpired;

    @OneToOne
    private User user;

    @OneToOne
    private Bus bus;

    @OneToOne
    private Driver driver;
}


