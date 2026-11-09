package com.auth;


import java.util.List;

import com.dto.UserDTO;
import com.entity.Address;

import lombok.Getter;
import lombok.Setter;
@Setter@Getter
public class Authresponse {

	private UserDTO coustmerdto;
	
	private String token;
	
	private  List<Address> address;
}
