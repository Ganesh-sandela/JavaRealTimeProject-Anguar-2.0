package com.Dto;

import java.math.BigDecimal;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartResponseDTO {

	private Long id;
    private Long productId;

    private String productName;

    private BigDecimal productPrice;

    private int quantity;

    private BigDecimal subtotal;

    private BigDecimal cartTotal;
}