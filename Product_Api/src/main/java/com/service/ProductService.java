package com.service;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.Dto.ProductCategeoryDTO;
import com.Dto.ProductDTO;
import com.Dto.ProductRequestDTO;
import com.Dto.WishlistDTO;
import com.entity.Products;
import com.entity.Users;

@Service
public interface ProductService {

    List<ProductCategeoryDTO> findall();

    List<ProductDTO> findByProductsCategoryId(Long categoryId);

    ProductDTO findByProductId(Long id);

    List<ProductDTO> findByProductsName(String name);

    String saveProduct(ProductRequestDTO dto);
    

    List<ProductDTO> getProductsByUserId(Integer userId);
    
	public String updateProduct(ProductRequestDTO dto, Long id) throws IOException;
	
	public Optional<Users> findByUserId(Integer userid);

	public String addToWishList(Integer userId, Long productId);
	
	public String RemoveFromWishList(Integer userId, Long productId);
	
	public List<WishlistDTO> GetWishlist(Integer id);

}