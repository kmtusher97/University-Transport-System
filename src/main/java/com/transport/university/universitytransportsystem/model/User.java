package com.transport.university.universitytransportsystem.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(exclude = {"driver", "stuff", "notifications", "feedBacks"})
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler", "driver", "stuff", "notifications", "feedBacks"})
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userId;

    @Email(message = "Provide a valid email")
    @Column(unique = true, nullable = false, updatable = false)
    private String email;

    @NotBlank(message = "Password is required")
    private String password;

    @NotBlank(message = "First Name is required")
    private String firstName;

    @NotBlank(message = "First Name is required")
    private String lastName;

    @NotBlank(message = "Mobile No is required")
    private String mobileNo;

    @Column(columnDefinition = "boolean default false")
    private Boolean isBlocked;

    @OneToOne(mappedBy = "user")
    private Driver driver;

    @OneToOne(mappedBy = "user")
    private Stuff stuff;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Notification> notifications = new ArrayList<>();

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<FeedBack> feedBacks = new ArrayList<>();
}
