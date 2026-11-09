package com.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Users;

public interface UserRepo  extends JpaRepository<Users, Integer>{

	Optional<Users> findById(Integer userId);

}
