package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Products;

public interface ProductRepo extends JpaRepository<Products, Long> {

	public List<Products> findByCategoryId(Long id);
	
	List<Products> findByNameContainingIgnoreCase(String name);

    List<Products> findByActiveTrue();

    List<Products> findByCategoryIdAndActiveTrue(Long categoryId);
	
	public List<Products> findByNameContaining(String productName);
	
	
}
