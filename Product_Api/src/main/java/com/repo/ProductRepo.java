package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.entity.Products;

@Repository
public interface ProductRepo extends JpaRepository<Products, Long> {

    // Get products by category
    List<Products> findByCategoryId(Long categoryId);

    // Search products by name
    List<Products> findByNameContainingIgnoreCase(String name);

    // Available products only
    List<Products> findByActiveTrue();

    // Available products in a category
    List<Products> findByCategoryIdAndActiveTrue(Long categoryId);
   

	List<Products> findByUserUserId(Integer userId);

}