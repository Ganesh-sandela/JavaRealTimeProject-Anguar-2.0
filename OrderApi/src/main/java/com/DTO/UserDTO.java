package com.DTO;

import java.sql.Date;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class UserDTO {
	private Integer userId;
	private String name;
	private String email;
	private Long phno;
	private String role;
	private String oldPwd;
	private String newPwd;
	private String conformPwd;
	private String resetPwd;
	private Date createdDate;
}
