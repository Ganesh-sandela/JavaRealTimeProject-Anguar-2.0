package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.Dto.WishlistDTO;
import com.entity.Wishlist;

public interface WhishlistRepo extends JpaRepository<Wishlist, Integer> {

	   void deleteByUser_UserIdAndProduct_Id(Integer userId, Long productId);
	   
	   List<Wishlist> findByUser_UserId(Integer userId);

	   




	
}
