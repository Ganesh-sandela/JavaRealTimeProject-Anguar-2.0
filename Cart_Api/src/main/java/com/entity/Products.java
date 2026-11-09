package com.entity;

import java.math.BigDecimal;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class Products {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Product Name
    private String name;

    // Description
    @Column(length = 1000)
    private String description;

    // Price
    private BigDecimal unitPrice;

    // Unit (kg, litre, piece...)
    private String unit;

    // Stock Quantity
    private int unitsInStock;

    // Harvest Date
    @Temporal(TemporalType.DATE)
    private Date harvestDate;

    // Organic Product
    private boolean organic;

    // Product Status
    
    private boolean active;

    // Farmer Location
    private String location;

    // Image
    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] image;

    // Created Date
    @Temporal(TemporalType.TIMESTAMP)
    private Date dateCreated;

    // Updated Date
    @Temporal(TemporalType.TIMESTAMP)
    private Date lastUpdate;

    @ManyToOne
    @JoinColumn(name = "category_id")
    private ProductCategory category;
    
    @ManyToOne
    @JoinColumn(name = "user_id")
    private Users user;
}





