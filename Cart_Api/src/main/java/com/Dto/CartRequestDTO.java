package com.Dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartRequestDTO {
 
	private Integer userId;
	
    private Long productId;

    private int quantity;
    
}