package com.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Products;

public interface ProductRepo extends JpaRepository<Products, Integer> {

	
	public Products findById(Long long1);
}
