package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class BusReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long busReportId;

    @NotNull(message = "Date is required")
    private Date date;

    @NotBlank(message = "Report can not be empty")
    @Column(columnDefinition = "TEXT")
    private String report;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean solved;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "bus_id", referencedColumnName = "busId", nullable = false)
    private Bus bus;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "driver_id", referencedColumnName = "driverId", nullable = false)
    private Driver driver;
}
