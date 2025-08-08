package com.sweetshop.sweetshop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.sweetshop.sweetshop")
public class SweetshopApplication {

	public static void main(String[] args) {
		SpringApplication.run(SweetshopApplication.class, args);
	}

}
