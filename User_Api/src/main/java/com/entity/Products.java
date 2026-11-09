package com.entity;

import java.math.BigDecimal;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
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
    @JsonBackReference
    private Users user;
    
}





