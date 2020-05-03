package com.transport.university.universitytransportsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"busReports", "schedules"})
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "busReports", "schedules"})
public class Bus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer busId;

    @NotBlank(message = "Bus Number is required")
    @Column(length = 50, unique = true, nullable = false)
    private String number;

    @NotNull(message = "Oil Tank Capacity is required")
    private Double oilTankCapacity;

    @NotNull(message = "Oil Tank Capacity is required")
    private Double gasCylinderCapacity;

    @Column(columnDefinition = "boolean default false")
    private Boolean isAvailable;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<BusReport> busReports = new HashSet<>();

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Schedule> schedules = new HashSet<>();
}
