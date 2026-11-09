package com.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.DTO.AddrDTO;
import com.DTO.AddressDTO;
import com.DTO.DataAdrUSR;
import com.DTO.OrderDTO;
import com.DTO.PaymentCallBackDTO;
import com.DTO.SettingUpdateDTO;
import com.entity.Order;
import com.request.PurchaseOrderRequest;
import com.response.AdressResponse;
import com.response.PurchaseOrderResponse;

public interface OrderService {

	
	public PurchaseOrderResponse createOrder(PurchaseOrderRequest request);
	
	public List<OrderDTO> getOrderByEmail(String email);
	
	public PurchaseOrderResponse updateOrder(PaymentCallBackDTO paymentcallbackdto);
	
	
	public PurchaseOrderResponse cancelOrder(Long id);
	
	 public AdressResponse getAllDetails(String email);
	 
	 public String addAddress(AddrDTO dto, Integer id);
	 
	 public boolean deleteAddress(Integer userid ,Long id) ;
	 
	 public DataAdrUSR getUSRADR(Integer Userid);
	 
	 public boolean UpdateSetting(Integer userid,SettingUpdateDTO dto);
}
