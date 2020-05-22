package com.transport.university.universitytransportsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"schedules"})
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "schedules"})
public class Stuff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer stuffId;

    @Column(columnDefinition = "integer default 0")
    private Integer rating;

    @Column(columnDefinition = "boolean default true")
    private Boolean isInService;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id", referencedColumnName = "userId", nullable = false, unique = true)
    private User user;

    @OneToMany(mappedBy = "stuff", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Schedule> schedules = new HashSet<>();
}
