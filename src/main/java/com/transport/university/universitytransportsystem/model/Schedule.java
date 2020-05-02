package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
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

    @Column(nullable = false)
    private Date date;

    @Column(nullable = false)
    private Time departureTime;

    @Column(nullable = false)
    private Time duration;

    @OneToOne
    @JoinColumn(name = "bus_id", referencedColumnName = "busId", nullable = false)
    private Bus bus;

    @OneToOne
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId", nullable = false)
    private Driver driver;

    @OneToOne
    @JoinColumn(name = "stuff1_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff1;

    @OneToOne
    @JoinColumn(name = "stuff2_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff2;

    @OneToOne
    @JoinColumn(name = "route_id", referencedColumnName = "routeId", nullable = false)
    private Route route;
}
