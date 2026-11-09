package com.DTO;

import java.util.List;

import com.entity.Address;

import lombok.Data;

@Data
public class DataAdrUSR {

	private UserDTO userDTO;
	
	private List<AddrDTO> addrDTO;

	
}
