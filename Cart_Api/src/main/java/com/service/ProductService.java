package com.service;

import com.Dto.CartRequestDTO;
import com.Dto.CartResDTO;
import com.Dto.CartResponseDTO;

public interface ProductService {

    CartResponseDTO addToCart( CartRequestDTO dto);
    public  CartResDTO getCratData(int userId);
    
    public boolean RemoveCartItem(int userid,long  productid);
    
    public boolean quantityUpdate(int userid,long cartId,int quantity);
}