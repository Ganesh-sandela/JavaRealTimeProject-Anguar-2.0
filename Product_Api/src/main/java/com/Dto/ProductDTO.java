package com.Dto;

import java.math.BigDecimal;
import java.util.Date;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {

    private Long id;

    // Product Name
    private String name;

    // Description
    private String description;

    // Price
    private BigDecimal unitPrice;

    // Unit
    private String unit;

    // Stock
    private int unitsInStock;

    // Harvest Date
    private Date harvestDate;

    // Organic Product
    private boolean organic;

    // Status
    private boolean active;

    // Location
    private String location;

    // Category
    private Long categoryId;
    private String categoryName;

    // Image (Base64 string or image URL)
    private String image;

    // Dates
    private Date dateCreated;
    private Date lastUpdate;
}