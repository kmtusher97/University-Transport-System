package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BusReport implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long busReportId;

    private String report;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "bus_id", referencedColumnName = "busId", nullable = false)
    private Bus bus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId", nullable = false)
    private Driver driver;
}
