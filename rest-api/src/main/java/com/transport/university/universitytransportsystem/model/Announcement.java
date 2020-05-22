package com.transport.university.universitytransportsystem.model;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
public class Announcement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long announcementId;

    @NotNull(message = "Date is required")
    private Date date;

    @NotBlank(message = "Announcement can not be empty")
	@Column(columnDefinition = "TEXT")
    private String announcement;
}
