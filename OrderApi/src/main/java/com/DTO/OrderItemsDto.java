package com.DTO;

import java.math.BigDecimal;

import com.entity.Order;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Data
public class OrderItemsDto {

	private Long productId;
	private String name;
	private int quantity;
	private BigDecimal unitPrice;
	private String imageUrl;
    
  
}
