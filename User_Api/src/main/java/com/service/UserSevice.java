package com.service;

import org.springframework.stereotype.Service;

import com.auth.Authresponse;
import com.dto.AddressDTO;
import com.dto.ResetPwdDTO;
import com.dto.UserDTO;

@Service
public interface UserSevice {

	
	public Boolean register(UserDTO dto,AddressDTO addrdto);
	
	public Boolean isUniqueEmail(String email);
	
	public UserDTO getUserByEmail(String eamil);
	
	public Boolean resetPwd(ResetPwdDTO rdto);
	
	public Authresponse login(UserDTO dto);
	
	public Boolean forgotPwd(String email);
}
