package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.DTO.AddrDTO;
import com.DTO.AddressDTO;
import com.DTO.DataAdrUSR;
import com.DTO.EmailRequest;
import com.DTO.OrderDTO;
import com.DTO.PaymentCallBackDTO;
import com.DTO.SettingUpdateDTO;
import com.entity.Users;
import com.mailsender.EmailService;
import com.request.PurchaseOrderRequest;
import com.response.AdressResponse;
import com.response.PurchaseOrderResponse;
import com.responseApi.ResponseApi;
import com.service.OrderServiceImpl;

@RestController
@CrossOrigin(origins = "*")
public class OrderRestController {

//    private final EmailService emailService;
//
//    private final WhishlistRepo whishlistRepo;

	@Autowired
	private OrderServiceImpl ordserv;

    
	@PostMapping("/order")
	public ResponseEntity<ResponseApi<PurchaseOrderResponse>> createOrder(@RequestBody PurchaseOrderRequest request) {
		ResponseApi<PurchaseOrderResponse> response = new ResponseApi<>();
		PurchaseOrderResponse orderResp = ordserv.createOrder(request);

		if (orderResp != null) {
			response.setStatuscode(200);
			response.setMsg("order created");
			response.setData(orderResp);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response.setStatuscode(500);
			response.setData(null);
			response.setMsg("failed to create order");
			return new ResponseEntity<ResponseApi<PurchaseOrderResponse>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/order")
	public ResponseEntity<ResponseApi<PurchaseOrderResponse>> updateOrder(@RequestBody PaymentCallBackDTO callbackdto) {
		ResponseApi<PurchaseOrderResponse> response = new ResponseApi<>();
		PurchaseOrderResponse orderResp = ordserv.updateOrder(callbackdto);

		if (orderResp != null) {
			response.setStatuscode(200);
			response.setMsg("order updated");
			response.setData(orderResp);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response.setStatuscode(500);
			response.setData(null);
			response.setMsg("failed to Update order");
			return new ResponseEntity<ResponseApi<PurchaseOrderResponse>>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/order/{email}")
	public ResponseEntity<ResponseApi<List<OrderDTO>>> getOrders(@PathVariable String email) {
		ResponseApi<List<OrderDTO>> response = new ResponseApi<>();
		List<OrderDTO> orderByEmail = ordserv.getOrderByEmail(email);

		if (!orderByEmail.isEmpty()) {
			response.setStatuscode(200);
			response.setMsg("order created");
			response.setData(orderByEmail);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response.setStatuscode(500);
			response.setData(null);
			response.setMsg("failed to create order");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping("/cancelOrder/{id}")
	public ResponseEntity<ResponseApi<PurchaseOrderResponse>> cancelOrder(@PathVariable Long id) {

		ResponseApi<PurchaseOrderResponse> response = new ResponseApi<>();
		PurchaseOrderResponse cancelOrder = ordserv.cancelOrder(id);
		if (cancelOrder != null) {
			response.setStatuscode(200);
			response.setMsg("order Cancelled");
			response.setData(cancelOrder);
			return new ResponseEntity<>(response, HttpStatus.CREATED);
		} else {
			response.setStatuscode(404);
			response.setData(null);
			response.setMsg("failed to Cancel order");
			return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@PostMapping("/getdetails")
	public ResponseEntity<ResponseApi<AdressResponse>> getDetails(@RequestBody EmailRequest request) {

		ResponseApi<AdressResponse> responseApi = new ResponseApi<>();
		

		AdressResponse allDetails = ordserv.getAllDetails(request.getEmail());

		if (allDetails != null) {
			responseApi.setStatuscode(200);
			responseApi.setMsg("All details of Customer Fetched...");
			responseApi.setData(allDetails);

			return new ResponseEntity<>(responseApi, HttpStatus.OK); // ✅ correct
		} else {
			responseApi.setStatuscode(404);
			responseApi.setMsg("No data found for this email");
			responseApi.setData(null);

			return new ResponseEntity<>(responseApi, HttpStatus.NOT_FOUND); // ✅ FIX HERE
		}
	}

	@PostMapping("/cancelOrder")
	public ResponseEntity<ResponseApi<PurchaseOrderResponse>> cancelOrder1(Long orderid) {

		PurchaseOrderResponse cancelOrder = ordserv.cancelOrder(orderid);
		ResponseApi<PurchaseOrderResponse> responseApi = new ResponseApi<>();
		if (cancelOrder != null) {
			responseApi.setStatuscode(200);
			responseApi.setMsg("All details of Customer Fetched...");
			responseApi.setData(cancelOrder);
			return new ResponseEntity<>(responseApi,HttpStatus.OK);
		}
		else {
			responseApi.setStatuscode(404);
			responseApi.setMsg("No data found for this email");
			responseApi.setData(null);

			return new ResponseEntity<>(responseApi, HttpStatus.NOT_FOUND); 
		}

	}

	@PostMapping("/addAddresses")
	public ResponseEntity<ResponseApi<String>> addaddresses(@RequestBody AddrDTO dto,
			@RequestParam Integer id) {
		System.out.println(dto.getCity());
		System.out.println(dto.getDistrict());
		System.out.println(dto.getHouseno());
		System.out.println(dto.getName());
		System.out.println(dto.getPhno());
		System.out.println(dto.getVillage());
		System.out.println(dto.getZipcode());
		

		String address = ordserv.addAddress(dto, id);
		ResponseApi<String> response = new ResponseApi<>();
		if (address != null) {
            
			
			
			response.setStatuscode(200);
			response.setData(null);
			response.setMsg(address);
			return new ResponseEntity<ResponseApi<String>>(response, HttpStatus.OK);
		} else {
			response.setData("not found user id");
			response.setMsg(address);
			response.setStatuscode(404);
			return new ResponseEntity<ResponseApi<String>>(response, HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/deleteadr")
	public ResponseEntity<ResponseApi<Boolean>> DeletebyId(@RequestParam int userid,@RequestParam Long id){
	
		ResponseApi<Boolean> response= new ResponseApi<>();
		boolean deleteAddress = ordserv.deleteAddress(userid,id);
		if (deleteAddress) {
			response.setData(deleteAddress);
			response.setMsg("deleet succesfully address");
			response.setStatuscode(200);
			return new ResponseEntity<ResponseApi<Boolean>>(response, HttpStatus.OK);
		} else {
			response.setData(deleteAddress);
			response.setMsg("not found a id by address");
			response.setStatuscode(404);
			return new ResponseEntity<ResponseApi<Boolean>>(response, HttpStatus.NOT_FOUND);

		}
	}
	
	@GetMapping("/getaddrusr")
	public ResponseEntity<ResponseApi<DataAdrUSR>> getUSRADR(@RequestParam Integer userid ){
	
		ResponseApi< DataAdrUSR> response= new ResponseApi<>();
		DataAdrUSR usradr = ordserv.getUSRADR(userid);
		if (usradr!=null) {
			response.setStatuscode(200);
			response.setData(usradr);
			response.setMsg("data fetched succesfully");
			return new ResponseEntity<ResponseApi<DataAdrUSR>>(response,HttpStatus.OK);
	
		} else {
 
			response.setStatuscode(204);
			response.setData(null);
			response.setMsg("doesnt found using those id");
			return new ResponseEntity<ResponseApi<DataAdrUSR>>(response,HttpStatus.NO_CONTENT);
			
		}
	}
	
	
	@PatchMapping("/updateSetting")
	public ResponseEntity<ResponseApi<SettingUpdateDTO>> UpdateSetting(@RequestParam Integer userid,@RequestBody SettingUpdateDTO dto ){
	
		ResponseApi< SettingUpdateDTO> response= new ResponseApi<>();
	boolean updateSetting = ordserv.UpdateSetting(userid, dto);
		if (updateSetting) {
			response.setStatuscode(200);
			response.setData(null);
			response.setMsg("updated  succesfully...");
			return new ResponseEntity<ResponseApi<SettingUpdateDTO>>(response,HttpStatus.OK);
	
		} else {
 
			response.setStatuscode(204);
			response.setData(null);
			response.setMsg("doesnt found using those id");
			return new ResponseEntity<ResponseApi<SettingUpdateDTO>>(response,HttpStatus.BAD_REQUEST);
			
		}
	}
}

