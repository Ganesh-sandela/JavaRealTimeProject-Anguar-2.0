package com.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.CartApiApplication;
import com.Dto.CartRequestDTO;
import com.Dto.CartResDTO;
import com.Dto.CartResponseDTO;
import com.repo.CartRepo;
import com.responseapi.ResponseApi;
import com.service.ProductService;

@RestController
@CrossOrigin("*")
public class CartController {

    private final CartApiApplication cartApiApplication;

    private final CartRepo cartRepo;

    @Autowired
    private ProductService pserv;
    
   

    CartController(CartRepo cartRepo, CartApiApplication cartApiApplication) {
        this.cartRepo = cartRepo;
        this.cartApiApplication = cartApiApplication;
    }

    @PostMapping("/addToCart")
    public ResponseEntity<ResponseApi<CartResponseDTO>> addToCart( @RequestBody CartRequestDTO dto){

    	
    	
        com.responseapi.ResponseApi<CartResponseDTO>
        response = new com.responseapi.ResponseApi<>();

        CartResponseDTO data =
                pserv.addToCart(dto);

        response.setStatus(200);

        response.setMsg(
                "Added To Cart");

        response.setData(data);

        return new ResponseEntity<>(
                response,
                HttpStatus.OK
        );
    }
    
    
    @GetMapping("/getCartItems")
    public ResponseEntity<ResponseApi<CartResDTO>> getCartItems(@RequestParam Integer userId){
    	
    	CartResDTO cratData = pserv.getCratData(userId);
    	
    	ResponseApi< CartResDTO> response= new ResponseApi<>();
    	
    	if (cratData!=null) {
    		
    		response.setData(cratData);
    		response.setMsg("fetched Data Succesfully....");
    		response.setStatus(200);
    		
    		return new ResponseEntity<ResponseApi<CartResDTO>>(response,HttpStatus.OK);
			
		} else {

			response.setData(null);
			response.setMsg("no item found Using UserId...");
			response.setStatus(400);
			return new ResponseEntity<ResponseApi<CartResDTO>>(response,HttpStatus.NOT_FOUND);
		}
    	
    }
    
    @DeleteMapping("/deleteCartItems")
    public ResponseEntity<ResponseApi<String>> getCartItems(@RequestParam Integer userId,
            @RequestParam("productid") Long productid){
    	
    	 boolean removeCartItem = pserv.RemoveCartItem(userId, productid);
    	
    	ResponseApi<String> response= new ResponseApi<>();
    	
    	if (removeCartItem) {
    		
    		response.setData(null);
    		response.setMsg("Removed Item Succesfully....");
    		response.setStatus(200);
    		
    		return new ResponseEntity<ResponseApi<String>>(response,HttpStatus.OK);
			
		} else {

			response.setData(null);
			response.setMsg("no item found Using UserId...");
			response.setStatus(400);
			return new ResponseEntity<ResponseApi<String>>(response,HttpStatus.NOT_FOUND);
		}
    	
    }
    
    @GetMapping("/updateQuantity")
    public ResponseEntity<ResponseApi<String>> updateCartQuantity(
            @RequestParam int userId,
            @RequestParam long cartId,
            @RequestParam int quantity) {
    	
    	System.out.println(
    		    "updateQuantity called: userId=" + userId
    		    + ", cartId=" + cartId
    		    + ", quantity=" + quantity
    		);

        ResponseApi<String> response = new ResponseApi<>();

        boolean updated = pserv.quantityUpdate(userId, cartId, quantity);

        if (updated) {
            response.setData("Quantity updated successfully");
            response.setMsg("Cart quantity updated");
            response.setStatus(200);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setData(null);
             response.setMsg("User or cart item not found, or quantity is invalid");
            response.setStatus(404);

            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}