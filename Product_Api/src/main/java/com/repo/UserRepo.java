package com.repo;

import java.util.Optional;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Users;

public interface UserRepo extends JpaRepository<Users, Integer> {

}
