package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Bus implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer busId;

    @NotBlank(message = "Bus Number is required")
    @Column(length = 50, unique = true, nullable = false)
    private String number;

    private String status;

    @NotNull(message = "Oil Tank Capacity is required")
    private Double oilTankCapacity;

    private Double oilInTank;

    @NotNull(message = "Oil Tank Capacity is required")
    private Double gasCylinderCapacity;

    private Double gasInCylinder;

    @Column(columnDefinition = "boolean default false")
    private Boolean isAvailable;
}
