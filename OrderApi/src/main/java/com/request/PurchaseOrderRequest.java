package com.request;

import java.util.List;

import com.DTO.AddressDTO;
import com.DTO.OrderDTO;
import com.DTO.OrderItemsDto;
import com.DTO.UserDTO;
import com.entity.Address;
import com.entity.Order;

import lombok.Data;

@Data
public class PurchaseOrderRequest {

	
	private UserDTO customer;
	
	private OrderDTO order;
	
	private AddressDTO address;
	
	private List<OrderItemsDto> orderItems;
	
}
