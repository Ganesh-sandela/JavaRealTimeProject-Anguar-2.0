package com.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "Address")
@Setter
@Getter
public class Address {

	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long id;
	private String houseno;
	private  String village;
	private String city;
	private String District;
	private String state;
	private String 	zipcode;
	
	@OneToOne
	@JoinColumn(name = "user_id")
	@JsonBackReference
	private Users user;
	
}
