package com.repo;

import org.springframework.data.jpa.repository.JpaRepository;


import com.entity.Wishlist;

public interface WhishlistRepo extends JpaRepository<Wishlist, Integer> {

	   void deleteByUser_UserIdAndProduct_Id(Integer userId, Long productId);



	
}
