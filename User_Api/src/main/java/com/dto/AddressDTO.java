package com.dto;

import lombok.Data;

@Data
public class AddressDTO {

	private Long id;
	private String houseno;
	private  String village;
	private String city;
	private String District;
	private String state;
	private String 	zipcode;
}
