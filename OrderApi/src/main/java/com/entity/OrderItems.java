package com.entity;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class OrderItems {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
    
    private String name;
    
    private int quantity;
    
    private BigDecimal unitPrice;
    @Column(name = "image_url", columnDefinition = "MEDIUMTEXT")
    private String imageUrl;
    
   
    
//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    private Coustmer coustmer; 
    
//    @ManyToOne
//    @JoinColumn(name = "order_id")
//    private Order order;
    
    @ManyToOne
    @JoinColumn(name="userr_id")
    private Users user;
    
    
    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "order_id")
    private Order order;
	
}
