package com.rest;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.Dto.ProductCategeoryDTO;
import com.Dto.ProductDTO;
import com.Dto.ProductRequestDTO;
import com.Dto.WishlistDTO;
import com.Responseapi.ResponseApi;
import com.entity.Users;
import com.service.ProductService;

@RestController
@CrossOrigin(origins = "*")
public class ProductContro {

	@Autowired
	private ProductService pserv;

	@GetMapping("/categories")
	public ResponseEntity<ResponseApi<List<ProductCategeoryDTO>>> productCategeories() {
		ResponseApi<List<ProductCategeoryDTO>> response = new ResponseApi<>();
		List<ProductCategeoryDTO> data = pserv.findall();
	
		if (data != null) {
			response.setStatus(200);
			response.setMsg("fetched categeories succesfully");
			response.setData(data);
			return new ResponseEntity<>(response, HttpStatus.OK);
		} else {
			response.setStatus(500);
			response.setMsg("Failed to fetch categories");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	
	@GetMapping("category/{categoreyId}")
	public ResponseEntity<ResponseApi<List<ProductDTO>>> products(@PathVariable Long categoreyId){
		 
		ResponseApi<List<ProductDTO>> response = new ResponseApi<>();
		List<ProductDTO> clist = pserv.findByProductsCategoryId(categoreyId);
		if (clist!=null) {
			response.setStatus(200);
			response.setMsg("fetched categeories succesfully");
			response.setData(clist);
			return new ResponseEntity<>(response, HttpStatus.OK);
		}
		
		else {
			response.setStatus(500);
			response.setMsg("Failed to fetch categories");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("product/{productId}")
	public ResponseEntity<ResponseApi<ProductDTO>> productbyid(@PathVariable Long productId){
		 ResponseApi<ProductDTO> response = new ResponseApi<>();
	 ProductDTO product = pserv.findByProductId(productId);
	 
	 if (product!=null) {
		 response.setStatus(200);
			response.setMsg("fetched products succesfully");
			response.setData(product);
			return new ResponseEntity<>(response, HttpStatus.OK);
	}
	 else {
		 response.setStatus(500);
			response.setMsg("Failed to fetch product");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	 }
	}
//	@GetMapping("/product")
//	public ResponseEntity<ResponseApi<ProductDTO>> productbyid(){
//		 ResponseApi<ProductDTO> response = new ResponseApi<>();
//	 ProductDTO product = pserv.findByProductId(productId);
//	 
//	 if (product!=null) {
//		 response.setStatus(200);
//			response.setMsg("fetched products succesfully");
//			response.setData(product);
//			return new ResponseEntity<>(response, HttpStatus.OK);
//	}
//	 else {
//		 response.setStatus(500);
//			response.setMsg("Failed to fetch product");
//			response.setData(null); // no payload
//			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
//	 }
//	}
	
	@GetMapping("/productsByName/{productName}")
	public ResponseEntity<ResponseApi<List<ProductDTO>>> getbyproductsname(@PathVariable String productName){
		
	
		 ResponseApi<List<ProductDTO>> response = new ResponseApi<>();
		 List<ProductDTO> product = pserv.findByProductsName(productName);

		 if (!product.isEmpty()) {
				response.setStatus(200);
				response.setMsg("Fetched Products Succesfully");
				response.setData(product);
				return new ResponseEntity<>(response, HttpStatus.OK);
	}else {
		response.setStatus(500);
		response.setMsg("Failed to fetch product");
		response.setData(null); // no payload
		return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
	}
}
	@PostMapping("/postProduct")
	public ResponseEntity<ResponseApi<String>> postingProducts(  @ModelAttribute ProductRequestDTO dto){
		
		 ResponseApi<String> response = new ResponseApi<>();
		if (dto!=null) {
			
			 String saveProduct = pserv.saveProduct(dto);
			 response.setStatus(200);
			 response.setMsg("done..");
			 response.setData(saveProduct);
			 
			 return new ResponseEntity<ResponseApi<String>>(response,HttpStatus.OK);
		}
		else {
			response.setStatus(500);
			response.setMsg("Failed to fetch product");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
	@GetMapping("/getProducts")
	public ResponseEntity<ResponseApi<List<ProductDTO>>> getProductsById(  @RequestParam  Integer userId){
		
		 ResponseApi<List<ProductDTO>> response = new ResponseApi<>();
		if (userId!=null) {
		    System.out.println("Received UserId = " + userId);
			 List<ProductDTO> saveProduct = pserv.getProductsByUserId(userId);

			    System.out.println("Products Found = " + saveProduct.size());
			 response.setStatus(200);
			 response.setMsg("done..");
			 response.setData(saveProduct);
			 
			 return new ResponseEntity<ResponseApi<List<ProductDTO>>>(response,HttpStatus.OK);
		}
		else {
			response.setStatus(500);
			response.setMsg("Failed to fetch product");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	@PutMapping("/updateProduct/{id}")
	public ResponseEntity<ResponseApi<String>> updateProduct(
	        @PathVariable Long id,
	        @ModelAttribute ProductRequestDTO dto) throws IOException {


	    String result = pserv.updateProduct(dto,id);

	    ResponseApi<String> response=new ResponseApi<>();

	    response.setStatus(200);
	    response.setMsg("done");
	    response.setData(result);

	    return ResponseEntity.ok(response);
	}
	
	
	@PostMapping("/AddToWishList")
	public ResponseEntity<ResponseApi<String>> AddTOWishList( @RequestParam Integer userId,
	        @RequestParam Long productId) {
		
		  Optional<Users> byUserId = pserv.findByUserId(userId);
		  ResponseApi<String> response = new ResponseApi<>();
		
		if (byUserId.isPresent()) {
			 String toWishList = pserv.addToWishList(userId, productId);
			 response.setData(null);
			 response.setMsg(toWishList);
			 response.setStatus(200);
			 return new ResponseEntity<ResponseApi<String>>(response,HttpStatus.OK);
			 
		} else {
             
			response.setStatus(500);
			response.setMsg("Failed to add Wishlist");
			response.setData(null); // no payload
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}
	
	
	@DeleteMapping("/RemoveFromWishList")
	public ResponseEntity<ResponseApi<String>> RemoveFromWishList( @RequestParam Integer userId,
	        @RequestParam Long productId) {
		
		  Optional<Users> byUserId = pserv.findByUserId(userId);
		  ResponseApi<String> response = new ResponseApi<>();
		
		if (byUserId.isPresent()) {
			 String toWishList = pserv.RemoveFromWishList(userId, productId);
			 response.setData(null);
			 response.setMsg(toWishList);
			 response.setStatus(200);
			 return new ResponseEntity<ResponseApi<String>>(response,HttpStatus.OK);
			 
		} else {
             
			response.setStatus(500);
			response.setMsg("Failed to add Wishlist");
			response.setData(null);
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
			
		}
	}
	
	@GetMapping("/GetWishlist")
	public ResponseEntity<ResponseApi<List<WishlistDTO>>> Getwhitelist(@RequestParam Integer id){
		  ResponseApi<List<WishlistDTO>> response = new ResponseApi<>();
		  Optional<Users> byUserId = pserv.findByUserId(id);
			if (byUserId.isPresent()) {
				 List<WishlistDTO> toWishList = pserv.GetWishlist(id);
				 response.setData(toWishList);
				 response.setMsg("fetched succesfully wishlist");
				 response.setStatus(200);
				 return new ResponseEntity<ResponseApi<List<WishlistDTO>>>(response,HttpStatus.OK);
				 
			} else {
	             
				response.setStatus(500);
				response.setMsg("Failed to add Wishlist");
				response.setData(null);
				return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
				
			}
		
	}
	
	
}