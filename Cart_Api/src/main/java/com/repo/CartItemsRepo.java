package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.CartItems;

public interface CartItemsRepo extends JpaRepository<CartItems, Long>{
	
	  List<CartItems> findByCartUserUserId(Integer userId);
	  
	  void deleteByCartUserUserIdAndProductId(Integer userId, Long productId);
}