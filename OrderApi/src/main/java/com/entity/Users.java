package com.entity;

import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer userId;
	private String name;
	private String email;
	private Long phno;
	private String role;
	private String conformPwd;
	private String newPwd;
	private String oldPwd;
	private String resetPwd;
	@CreationTimestamp
	private Date createdDate;
	@UpdateTimestamp
	private Date lastUpdated;

	@OneToMany(mappedBy = "user")
	@JsonManagedReference
	private List<Products> products;

//	@OneToOne(mappedBy = "user")
//	@JsonManagedReference
//	private Address address;
	
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Address> addresses = new ArrayList<>();

}
