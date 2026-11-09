package com.Dto;

import org.apache.catalina.User;

import com.entity.Users;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class WishlistDTO {

private int id;
	
	private UserDTO user;
	
	private ProductDTO Product;

}
