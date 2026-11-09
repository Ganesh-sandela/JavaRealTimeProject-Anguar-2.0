package com.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.Dto.CartRequestDTO;
import com.Dto.CartResDTO;
import com.Dto.CartResponseDTO;
import com.Dto.ProductDto;
import com.entity.Cart;
import com.entity.CartItems;
import com.entity.Products;
import com.entity.Users;
import com.repo.CartItemsRepo;
import com.repo.CartRepo;
import com.repo.ProductRepo;
import com.repo.UserRepo;

import jakarta.transaction.Transactional;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo prepo;

    @Autowired
    private CartRepo crepo;

    @Autowired
    private CartItemsRepo cirepo;
    
    @Autowired
    private UserRepo urepo;

    @SuppressWarnings("deprecation")
	@Override
	public CartResponseDTO addToCart(CartRequestDTO dto) {

	    Optional<Users> userOptional =
	            urepo.findById(dto.getUserId());
	    

	    if (userOptional.isEmpty()) {
	        return null;
	    }

	    Users user = userOptional.get();
	    System.out.println(user.getUserId());

	    Products product =
	            prepo.findById(dto.getProductId());

	    if (product == null) {
	        return null;
	    }

	    BigDecimal subtotal = product.getUnitPrice()
	            .multiply(BigDecimal.valueOf(dto.getQuantity()));

	    Cart cart = new Cart();
	    cart.setUser(user);
	    cart.setTotalPrice(subtotal);

	    Cart savedCart = crepo.save(cart);

	    CartItems item = new CartItems();
	    item.setProduct(product);
	    item.setQuantity(dto.getQuantity());
	    item.setSubtotal(subtotal);
	    item.setCart(savedCart);

	    cirepo.save(item);

	    CartResponseDTO response = new CartResponseDTO();
	    response.setProductId(product.getId());
	    response.setProductName(product.getName());
	    response.setProductPrice(product.getUnitPrice());
	    response.setQuantity(dto.getQuantity());
	    response.setSubtotal(subtotal);
	    response.setCartTotal(subtotal);

	    return response;
	}

    
    @Override
    public CartResDTO getCratData(int userId) {

        CartResDTO resDto = new CartResDTO();

        Optional<Users> byId = urepo.findById(userId);

        if (byId.isEmpty()) {
            return null;
        }

        List<CartItems> cartItems =
                cirepo.findByCartUserUserId(userId);

        List<CartResponseDTO> responseList = new ArrayList<>();
        List<ProductDto> prdList = new ArrayList<>();

        for (CartItems item : cartItems) {

            CartResponseDTO cresDto = new CartResponseDTO();

            Products prd = prepo.findById(item.getProduct().getId());

            // Map product details
            ProductDto pdto = new ProductDto();
            
             pdto.setCartid(item.getId());
            pdto.setId(prd.getId());
            pdto.setCategoryId(prd.getCategory().getId());
            pdto.setCategoryName(prd.getCategory().getCategoryName());
            pdto.setDateCreated(prd.getDateCreated());
            pdto.setDescription(prd.getDescription());
            pdto.setHarvestDate(prd.getHarvestDate());
            pdto.setImage(
            	    prd.getImage() != null
            	        ? java.util.Base64.getEncoder().encodeToString(prd.getImage())
            	        : null
            	);
            pdto.setLastUpdate(prd.getLastUpdate());
            pdto.setLocation(prd.getLocation());
            pdto.setName(prd.getName());
            pdto.setOrganic(prd.isOrganic());
            pdto.setActive(prd.isActive());
            pdto.setUnit(prd.getUnit());
            pdto.setUnitPrice(prd.getUnitPrice());
            pdto.setUnitsInStock(prd.getUnitsInStock());

            prdList.add(pdto);

            // Map cart item details
            cresDto.setProductId(prd.getId());
            cresDto.setProductName(prd.getName());
            cresDto.setProductPrice(prd.getUnitPrice());
            cresDto.setQuantity(item.getQuantity());
            cresDto.setSubtotal(item.getSubtotal());

            responseList.add(cresDto);
        }

        resDto.setCartRes(responseList);
        resDto.setPrdDto(prdList);

        return resDto;
    }

    @Transactional
    @Override
    public boolean RemoveCartItem(int userid, long productid) {

        Optional<Users> user = urepo.findById(userid);

        if (user.isEmpty()) {
            return false;
        }

        List<CartItems> items =
            cirepo.findByCartUserUserId(userid);

        boolean exists = items.stream()
            .anyMatch(item ->
                item.getProduct().getId() == productid
            );

        if (!exists) {
            return false;
        }

        cirepo.deleteByCartUserUserIdAndProductId(
            userid, productid
        );

        return true;
    }

    @Override
    @Transactional
    public boolean quantityUpdate(int userid, long cartId, int quantity) {

        Optional<Users> user = urepo.findById(userid);

        if (user.isEmpty()) {
            System.out.println("User not found: " + userid);
            return false;
        }

        Optional<CartItems> cartItem = cirepo.findById(cartId);

        if (cartItem.isEmpty()) {
            System.out.println("Cart item not found: " + cartId);
            return false;
        }

        CartItems item = cartItem.get();

        if (!item.getCart().getUser().getUserId().equals(userid)) {
            System.out.println("Cart item does not belong to user: " + userid);
            return false;
        }

        int newQuantity = item.getQuantity() + quantity;

        if (newQuantity <= 0) {
            System.out.println("Invalid quantity: " + newQuantity);
            return false;
        }

        item.setQuantity(newQuantity);

        item.setSubtotal(
            item.getProduct().getUnitPrice()
                .multiply(BigDecimal.valueOf(newQuantity))
        );

        cirepo.save(item);

        System.out.println("Quantity updated successfully");
        return true;
    }
    
}