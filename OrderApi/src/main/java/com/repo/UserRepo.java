package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.DTO.EmailRequest;
import com.entity.Users;

public interface UserRepo  extends JpaRepository<Users, Integer> {

	
	Users findByEmail(String email);

    Users findByEmailAndRole(String email, String role);

    Users findByPhno(Long phno);

    boolean existsByEmail(String email);

    boolean existsByPhno(Long phno);
//	public Customer findByEmail(EmailRequest email);
}
