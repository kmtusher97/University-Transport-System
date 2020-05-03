package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
public class Driver implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer driverId;

    @Column(columnDefinition = "integer default 0")
    private Integer rating;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", unique = true)
    private User user;

    @Column(columnDefinition = "boolean default true")
    private Boolean isInService;
}
