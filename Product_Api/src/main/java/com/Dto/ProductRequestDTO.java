package com.Dto;

import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductRequestDTO {

	 private Long id;
    // Product Name
    private String name;

    // Description
    private String description;

    // Category
    private Long categoryId;

    // Price
    private BigDecimal unitPrice;

    // Unit
    private String unit;

    // Stock Quantity
    private int unitsInStock;

    // Harvest Date
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private Date harvestDate;

    // Organic Product
    private boolean organic;

    // Status
    private boolean active;

    // Location
    private String location;

    // Product Image
    private MultipartFile image;
    
    private int userId;
}