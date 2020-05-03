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
    private String report;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean solved;
}
