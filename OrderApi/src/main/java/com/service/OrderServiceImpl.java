package com.service;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.DTO.AddrDTO;
import com.DTO.AddressDTO;
import com.DTO.DataAdrUSR;
import com.DTO.OrderDTO;
import com.DTO.OrderItemsDto;
import com.DTO.PaymentCallBackDTO;
import com.DTO.SettingUpdateDTO;
import com.DTO.UserDTO;
import com.entity.Address;
import com.entity.Order;
import com.entity.OrderItems;
import com.entity.Users;
import com.mailsender.EmailService;
import com.repo.AddressEntityRepo;
import com.repo.OrderItemsRepo;
import com.repo.OrderRepo;
import com.repo.UserRepo;
import com.request.PurchaseOrderRequest;
import com.response.AdressResponse;
import com.response.PurchaseOrderResponse;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class OrderServiceImpl implements OrderService {

    private final AddressEntityRepo addressRepo;
    private final OrderRepo orderRepo;
    private final OrderItemsRepo orderItemsRepo;
    private final UserRepo userRepo;
    private final RazorPayService razorPayService;
    private final EmailService emailService;

    public OrderServiceImpl(
            AddressEntityRepo addressRepo,
            OrderRepo orderRepo,
            OrderItemsRepo orderItemsRepo,
            UserRepo userRepo,
            RazorPayService razorPayService,
            EmailService emailService) {

        this.addressRepo = addressRepo;
        this.orderRepo = orderRepo;
        this.orderItemsRepo = orderItemsRepo;
        this.userRepo = userRepo;
        this.razorPayService = razorPayService;
        this.emailService = emailService;
    }

    @Override
    public PurchaseOrderResponse createOrder(PurchaseOrderRequest request) {

        UserDTO userDto = request.getCustomer();
        AddressDTO addressDto = request.getAddress();
        OrderDTO orderDto = request.getOrder();
        List<OrderItemsDto> orderItemsDtoList = request.getOrderItems();

        Users user = userRepo.findByEmail(userDto.getEmail());

        if (user == null) {
            user = new Users();
            user.setName(userDto.getName());
            user.setEmail(userDto.getEmail());
            user.setPhno(userDto.getPhno());
            user.setRole(userDto.getRole());

            user = userRepo.save(user);
        }

        Address address = new Address();
        address.setHouseno(addressDto.getHouseno());
        address.setCity(addressDto.getCity());
        address.setState(addressDto.getState());
        address.setZipcode(addressDto.getZipcode());
        address.setUser(user);

        address = addressRepo.save(address);

        String trackingNumber = generateTrackingNumber();

        com.razorpay.Order razorpayOrder =
                razorPayService.createRazorpayOrder(orderDto.getTotalPrice());

        Order order = new Order();

        order.setOrderTrackingno(trackingNumber);
        order.setRazorPayOrderId(razorpayOrder.get("id").toString());
        order.setOrderStatus(razorpayOrder.get("status").toString());
        order.setTotalPrice(orderDto.getTotalPrice());
        order.setTotalQuantity(orderDto.getTotalQuantity());
        order.setEmail(user.getEmail());
        order.setUser(user);
        order.setAddress(address);

        order = orderRepo.save(order);

        for (OrderItemsDto dto : orderItemsDtoList) {

            OrderItems item = new OrderItems();

            item.setName(dto.getName());
            item.setQuantity(dto.getQuantity());
            item.setUnitPrice(dto.getUnitPrice());
            item.setImageUrl(dto.getImageUrl());

            item.setUser(user);
            item.setOrder(order);

            System.out.println("Image URL length: " +
            	    (item.getImageUrl() == null
            	        ? 0
            	        : item.getImageUrl().length()));
            orderItemsRepo.save(item);
        }

        return PurchaseOrderResponse.builder()
                .razorpayorderId(razorpayOrder.get("id"))
                .orderStatus(razorpayOrder.get("status"))
                .orderTrackingNumber(trackingNumber)
                .build();
    }

    private String generateTrackingNumber() {

        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");

        String timeStamp = sdf.format(new Date());

        String random =
                UUID.randomUUID()
                        .toString()
                        .substring(0, 5)
                        .toUpperCase();

        return "OD" + timeStamp + random;
    }
    
    @Override
    public List<OrderDTO> getOrderByEmail(String email) {

        List<Order> orders = orderRepo.findByEmail(email);

        List<OrderDTO> orderDTOList = new ArrayList<>();

        for (Order order : orders) {

            OrderDTO dto = new OrderDTO();

            dto.setOrderid(order.getId());
            dto.setOrderTrackingno(order.getOrderTrackingno());
            dto.setRazorpayOrderId(order.getRazorPayOrderId());
            dto.setEmail(order.getEmail());
            dto.setOrderStatus(order.getOrderStatus());
            dto.setTotalPrice(order.getTotalPrice());
            dto.setTotalQuantity(order.getTotalQuantity());
            dto.setRazorPayPaymentId(order.getRazorPayPaymentId());
            dto.setInvoiceurl(order.getInvoiceurl());
            dto.setDeliverydate(order.getDeliverydate());
            dto.setPaymentStatus(order.getPaymentStatus());

            orderDTOList.add(dto);
        }

        return orderDTOList;
    }

    @Override
    public PurchaseOrderResponse updateOrder(PaymentCallBackDTO paymentCallBackDTO) {

        Order order = orderRepo.findByRazorPayOrderId(
                paymentCallBackDTO.getRazorPayOrderId());

        if (order == null) {
            throw new RuntimeException("Order not found.");
        }

        order.setOrderStatus("CONFIRMED");
        order.setPaymentStatus("SUCCESS");
        order.setDeliverydate(LocalDate.now().plusDays(3));
        order.setRazorPayPaymentId(paymentCallBackDTO.getRazorPayPaymentId());

        orderRepo.save(order);

        String subject = "Order Confirmed";

        String body =
                "Dear Customer,\n\n"
                + "Your order has been confirmed successfully.\n\n"
                + "Order Tracking Number : "
                + order.getOrderTrackingno()
                + "\nExpected Delivery : "
                + order.getDeliverydate()
                + "\n\nThank you for shopping with us.";

        emailService.mailsender(subject, body, order.getEmail());

        return PurchaseOrderResponse.builder()
                .orderTrackingNumber(order.getOrderTrackingno())
                .razorpayorderId(order.getRazorPayOrderId())
                .orderStatus(order.getOrderStatus())
                .build();
    }

    @Override
    public PurchaseOrderResponse cancelOrder(Long orderId) {

        Order order = orderRepo.findById(orderId)
                .orElseThrow(() ->
                        new RuntimeException("Order not found with id : " + orderId));

        razorPayService.refundPayment(
                order.getRazorPayPaymentId(),
                order.getTotalPrice());

        order.setOrderStatus("CANCELLED");
        order.setPaymentStatus("REFUND_IN_PROGRESS");

        orderRepo.save(order);

        String subject = "Order Cancelled";

        String body =
                "Dear "
                + order.getUser().getName()
                + ",\n\nYour order has been cancelled successfully."
                + "\n\nTracking Number : "
                + order.getOrderTrackingno()
                + "\nRefund Status : REFUND_IN_PROGRESS"
                + "\nRefund will be credited within 3 working days."
                + "\n\nThank you.";

        emailService.mailsender(subject, body, order.getEmail());

        return PurchaseOrderResponse.builder()
                .orderTrackingNumber(order.getOrderTrackingno())
                .razorpayorderId(order.getRazorPayOrderId())
                .orderStatus(order.getOrderStatus())
                .build();
    }
    @Override
    public AdressResponse getAllDetails(String email) {

        Users user = userRepo.findByEmail(email);

        if (user == null) {
            throw new RuntimeException("User not found with email : " + email);
        }

        List<Address> addressList = addressRepo.findByUserUserId(user.getUserId());

        List<Order> orderList = new ArrayList<>();

        for (Address address : addressList) {

            List<Order> orders = orderRepo.findByAddressId(address.getId());

            orderList.addAll(orders);
        }

        List<OrderItems> orderItemsList = new ArrayList<>();

        for (Order order : orderList) {

            List<OrderItems> items = orderItemsRepo.findByOrderId(order.getId());

            orderItemsList.addAll(items);
        }

        return AdressResponse.builder()
                .user(user)
                .address(addressList)
                .order(orderList)
                .orderItems(orderItemsList)
                .build();
    }

    @Override
    public String addAddress(AddrDTO dto, Integer id) {

        Users user = userRepo.findById(id).orElse(null);

        if (user == null) {
            return "User ID not found";
        }

        Address adr = new Address();
        adr.setUser(user);
        adr.setHouseno(dto.getHouseno());
        adr.setVillage(dto.getVillage());
        adr.setCity(dto.getCity());
        adr.setDistrict(dto.getDistrict());
        adr.setState(dto.getState());
        adr.setZipcode(dto.getZipcode());

        addressRepo.save(adr);

        return "Address saved successfully";
    }

	@Override
	public boolean deleteAddress(Integer userid, Long id) {

	    Optional<Users> userOpt = userRepo.findById(userid);

	    if (userOpt.isEmpty()) {
	        return false;
	    }

	    Optional<Address> addressOpt = addressRepo.findById(id);

	    if (addressOpt.isEmpty()) {
	        return false;
	    }

	    Address address = addressOpt.get();

	    // Check whether this address belongs to this user
	    if (!address.getUser().getUserId().equals(userid)) {
	        return false;
	    }

	    addressRepo.delete(address);

	    return true;
	}

	@Override
	public DataAdrUSR getUSRADR(Integer userId) {

	    Optional<Users> byId = userRepo.findById(userId);

	    if (byId.isEmpty()) {
	        return null;
	    }

	    DataAdrUSR dau = new DataAdrUSR();

	    Users existingUser = byId.get();

	    UserDTO u = new UserDTO();
	    u.setUserId(existingUser.getUserId());
	    u.setName(existingUser.getName());
	    u.setEmail(existingUser.getEmail());
	    u.setPhno(existingUser.getPhno());
	    u.setRole(existingUser.getRole());
         u.setCreatedDate(existingUser.getCreatedDate());
	    List<Address> addresses = existingUser.getAddresses();
	    
	    
	    System.out.println("User ID: " + existingUser.getUserId());
	    System.out.println("Addresses from database: " + addresses.size());
	    List<AddrDTO> addrDTOList = new ArrayList<>();
	    
	    for (Address address : addresses) {
	        AddrDTO adr = new AddrDTO();

	        adr.setId(address.getId());
	        adr.setVillage(address.getVillage());
	        adr.setCity(address.getCity());
	        adr.setDistrict(address.getDistrict());
	        adr.setHouseno(address.getHouseno());
	        adr.setState(address.getState());
	        adr.setZipcode(address.getZipcode());

	        addrDTOList.add(adr);

	        System.out.println("Added address ID: " + adr.getId());
	    }

	    System.out.println("Address DTO count: " + addrDTOList.size());

	    dau.setAddrDTO(addrDTOList);
	    dau.setUserDTO(u);

	    return dau;
	}

	@Override
	public boolean UpdateSetting(Integer userid, SettingUpdateDTO dto) {

	    Optional<Users> byId = userRepo.findById(userid);
	    Optional<Address> byId2 = addressRepo.findById(dto.getId());

	    if (byId.isEmpty() || byId2.isEmpty()) {
	        return false;
	    }

	    // Update existing user
	    Users user = byId.get();
	    user.setEmail(dto.getEmail());
	    user.setName(dto.getName());
	    user.setPhno(dto.getPhno());
	  

	    // Update existing address
	    Address address = byId2.get();
	    address.setCity(dto.getCity());
	    address.setDistrict(dto.getDistrict());
	    address.setState(dto.getState());
	    address.setVillage(dto.getVillage());
	    address.setZipcode(dto.getZipcode());

	    userRepo.save(user);
	    addressRepo.save(address);

	    return true;
	}


}