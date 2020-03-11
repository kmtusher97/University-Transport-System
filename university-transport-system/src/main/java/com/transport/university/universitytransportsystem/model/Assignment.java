package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Assignment implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    private Date date;

    private String shift;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bus_id", referencedColumnName = "busId", nullable = false)
    private Bus bus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId", nullable = false)
    private Driver driver;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stuff1_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff1;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "stuff2_id", referencedColumnName = "stuffId", nullable = true)
    private Stuff stuff2;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "route_id", referencedColumnName = "routeId", nullable = false)
    private Route route;
}
