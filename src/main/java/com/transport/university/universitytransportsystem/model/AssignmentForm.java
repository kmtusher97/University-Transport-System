package com.transport.university.universitytransportsystem.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Time;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AssignmentForm {

    private Date date;

    private Time departureTime;

    private Time duration;

    private Integer busId;

    private Integer driverId;

    private Integer stuff1Id;

    private Integer stuff2Id;

    private Integer routeId;
}
