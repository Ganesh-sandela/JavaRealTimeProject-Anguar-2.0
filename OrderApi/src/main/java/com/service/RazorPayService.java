package com.service;

import java.math.BigDecimal;

import org.springframework.stereotype.Service;

import com.entity.Order;


import java.math.BigDecimal;

public interface RazorPayService {

    com.razorpay.Order createRazorpayOrder(BigDecimal amount);

    String refundPayment(String paymentId, BigDecimal amount);

}
