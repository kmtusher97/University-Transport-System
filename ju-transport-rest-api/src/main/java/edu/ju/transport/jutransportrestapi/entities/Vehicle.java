package edu.ju.transport.jutransportrestapi.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long vehicleId;

    @Column(length = 50, unique = true, nullable = false)
    private String vehicleNumber;

    @Column(length = 50, unique = true, nullable = false)
    private String chassisNumber;

    @Column(length = 50, unique = true, nullable = false)
    private String engineNumber;
}
