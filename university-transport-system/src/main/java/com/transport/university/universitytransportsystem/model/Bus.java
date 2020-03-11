package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Bus implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer busId;

    @Column(length = 50, unique = true, nullable = false)
    private String number;

    private String status;

    private Double oilTankCapacity;

    private Double oilInTank;

    private Double gasCylinderCapacity;

    private Double gasInCylinder;

    @Column(columnDefinition = "boolean default false")
    private Boolean isAvailable;
}
