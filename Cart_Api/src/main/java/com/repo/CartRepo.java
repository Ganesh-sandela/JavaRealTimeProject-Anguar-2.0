package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Cart;

public interface CartRepo extends JpaRepository<Cart, Long>{

}