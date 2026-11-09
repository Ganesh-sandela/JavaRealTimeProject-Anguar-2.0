package com.Dto;

import java.util.List;

import com.entity.Products;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
@Setter
@Getter
public class CartResDTO {

	public List<ProductDto> prdDto;
	
	public List<CartResponseDTO> cartRes;

	
	
}

