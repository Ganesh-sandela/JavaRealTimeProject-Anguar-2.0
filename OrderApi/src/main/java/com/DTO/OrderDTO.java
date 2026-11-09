package com.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
@Data
public class OrderDTO {

private Long orderid;
	
	private String  orderTrackingno;
	
	private String razorpayOrderId;
	
	private String email;
	
	private String orderStatus;
	
	private BigDecimal totalPrice;
	
	private int totalQuantity;
	
	private String razorPayPaymentId;
	
	private String invoiceurl;
	
	private LocalDate deliverydate;
	
	private String paymentStatus;


}
