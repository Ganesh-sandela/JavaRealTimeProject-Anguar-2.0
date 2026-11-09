package com.service;

import java.math.BigDecimal;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.razorpay.Refund;

import lombok.SneakyThrows;

@Service
public class RazorpayServiceImpli implements RazorPayService {

	@Value("${razorpay.key.id}")
	private String razorpaykey;

	@Value("${razorpay.key.secret}")
	private String razorpaysecret;

	private RazorpayClient client;

	@Override
	@SneakyThrows
	public com.razorpay.Order createRazorpayOrder(BigDecimal Amount) {

//		this.client = new RazorpayClient(razorpaykey, razorpaysecret);
//
//		BigDecimal amountInPaise = Amount.multiply(BigDecimal.valueOf(100));
//
//		if (amountInPaise.compareTo(BigDecimal.valueOf(100))<100) {
//			throw new RuntimeException("Amount must be at least ₹1");
//		}
//
//		JSONObject orderRequest = new JSONObject();
//		orderRequest.put("amount", amountInPaise);
//		orderRequest.put("currency", "INR");
//		orderRequest.put("payment_capture", 1);
//
//		return client.orders.create(orderRequest);
		
		
		 if (Amount == null || Amount.compareTo(BigDecimal.ZERO) <= 0) {
		        throw new RuntimeException("Order amount must be greater than zero.");
		    }

		    // Convert rupees to paise.
		    BigDecimal amountInPaise = Amount.multiply(BigDecimal.valueOf(100));

		    // Razorpay requires at least 100 paise (₹1).
		    if (amountInPaise.compareTo(BigDecimal.valueOf(100)) < 0) {
		        throw new RuntimeException("Amount must be at least ₹1");
		    }

		    this.client = new RazorpayClient(razorpaykey, razorpaysecret);

		    JSONObject orderRequest = new JSONObject();
		    orderRequest.put("amount", amountInPaise.intValueExact());
		    orderRequest.put("currency", "INR");
		    orderRequest.put("payment_capture", 1);

		    return client.orders.create(orderRequest);
		}
	

	@Override
	@SneakyThrows
	public String refundPayment(String paymentId, BigDecimal amount) {
		this.client = new RazorpayClient(razorpaykey, razorpaysecret);
		JSONObject refundreq = new JSONObject();
		refundreq.put("payment_id", paymentId);
		refundreq.put("amount", amount.multiply(BigDecimal.valueOf(100)));

		Refund refund = client.payments.refund(refundreq);
		return refund.get("id");
	}

}