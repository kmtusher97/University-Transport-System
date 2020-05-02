package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Schedule implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    @NotNull(message = "Date is required")
    private Date date;

    @NotNull(message = "Departure Time is required")
    private Time departureTime;

    @OneToOne
    @JoinColumn(name = "bus_id", referencedColumnName = "busId")
    @NotNull(message = "Bus ID is required")
    private Bus bus;

    @OneToOne
    @JoinColumn(name = "route_id", referencedColumnName = "routeId")
    @NotNull(message = "Route is required")
    private Route route;

    @OneToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId")
    @NotNull(message = "Driver ID is required")
    private Driver driver;

    @OneToOne
    @JoinColumn(name = "stuff1_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff1;

    @OneToOne
    @JoinColumn(name = "stuff2_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff2;

}
