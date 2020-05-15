package com.transport.university.universitytransportsystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAsync
@EnableScheduling
public class UniversityTransportSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(UniversityTransportSystemApplication.class, args);
	}

}
