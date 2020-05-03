package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = "routeDetail")
@Entity
public class Route implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer routeId;

    private String route;

    @Transient
    private List<Stoppage> routeDetail;
}
