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
public class Stoppage implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stoppageId;

    @NotBlank(message = "Stoppage Name is required.")
    private String stoppageName;

    @NotNull(message = "Latitude is required")
    private Double latitude;

    @NotNull(message = "Latitude is required")
    private Double longitude;
}
