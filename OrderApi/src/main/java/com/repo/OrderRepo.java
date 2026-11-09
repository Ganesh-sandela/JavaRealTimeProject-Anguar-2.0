package com.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.entity.Order;
import com.entity.Users;

public interface OrderRepo extends JpaRepository<Order, Long> {

	boolean existsByAddress_Id(Long addressId);

	public Order findByRazorPayOrderId(String razorPayOrderId);

	public List<Order> findByEmail(String email);

	public List<Order> findByAddressId(Long id);

	public List<Order> findByUserUserId(Integer id);
}
