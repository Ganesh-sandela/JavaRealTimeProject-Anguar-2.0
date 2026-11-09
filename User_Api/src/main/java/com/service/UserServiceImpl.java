package com.service;


import java.util.Collections;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.ModelMapper.UserModelMapper;
import com.auth.Authresponse;
import com.dto.AddressDTO;
import com.dto.ResetPwdDTO;
import com.dto.UserDTO;
import com.entity.Address;
import com.entity.Users;
import com.jwt.JwtUtil;
import com.mail.EmailSender;
import com.repo.UserRepo;

@Service
public class UserServiceImpl implements UserSevice, UserDetailsService {
    
	@Autowired
    private JwtUtil jwtutil;

	@Autowired
	private UserRepo urepo;
	
	@Autowired
	private BCryptPasswordEncoder PwdEncode;
	
	@Autowired
	private EmailSender mailsend;
	
//	@Autowired
//	private AuthenticationManager authmanager;

	private final AuthenticationManager authmanager;

	

	@Autowired
	public UserServiceImpl(@Lazy AuthenticationManager authmanager) {
	    this.authmanager = authmanager;
	}
	@Override
	public Boolean register(UserDTO dto,AddressDTO addrdto) {
//		if (dto != null) {
//			Coustmer entity = CoustmerModelMapper.cvrDtoToEntity(dto);
//			Coustmer save = crepo.save(entity);
//			return save != null;
//		}
	
		
		String org = generatePWd();
		String encode = PwdEncode.encode(org);
		Users entity = UserModelMapper.cvrDtoToEntity(dto);
		entity.setOldPwd(encode);
		entity.setResetPwd("NO");
		
		
		Address adr= new Address();
		adr.setVillage(addrdto.getVillage());
		adr.setCity(addrdto.getCity());
		adr.setState(addrdto.getState());
		adr.setZipcode(addrdto.getZipcode());
		adr.setDistrict(addrdto.getDistrict());
		
	    // Connect Address with User
	    entity.setAddresses((List<Address>) adr);
	    adr.setUser(entity);
		
	    Users save = urepo.save(entity);
		
	
		if (save.getUserId()!=null ) {
			String subject = "Registration Successful";

	    	String body = "Hello " + dto.getName() + ",\n\n" 
	    	        + "Your temporary password is: " + org + "\n\n"
	    	        + "Please login and change your password.\n\n"
	    	        + "Regards,\nTeam";
	    return mailsend.mailsend(save.getEmail(), subject, body);
	    	
		}
		return false;
	}

	@Override
	public Boolean isUniqueEmail(String email) {
		Users u = urepo.findByEmail(email);
		return u == null;
	}

	@Override
	public UserDTO getUserByEmail(String email) {
		Users user = urepo.findByEmail(email);
		if (user != null) {
			UserDTO dto = UserModelMapper.cvrtEntityToDto(user);
			return dto;
		}
		return null;
	}

	@Override
	public Boolean resetPwd(ResetPwdDTO rdto) {
	
		Users c = urepo.findByEmail(rdto.getEmail());
		  String encodedPwd = PwdEncode.encode(rdto.getNewPwd());
		
	
		    c.setOldPwd(encodedPwd);
		c.setResetPwd("YES");
	Users save = urepo.save(c);
		
		return save!=null;
	}

	@Override
	public Authresponse login(UserDTO dto) {

	    UsernamePasswordAuthenticationToken token =
	            new UsernamePasswordAuthenticationToken(
	                    dto.getEmail(),
	                    dto.getOldPwd());

	    Authentication authenticate = authmanager.authenticate(token);

	    if (authenticate.isAuthenticated()) {

	        Users entity = urepo.findByEmail(dto.getEmail());

	        if (!entity.getRole().equalsIgnoreCase(dto.getRole())) {
	            throw new ResponseStatusException(
	                    HttpStatus.UNAUTHORIZED,
	                    "Selected role is incorrect");
	        }

	        String jwt = jwtutil.generateToken(dto.getEmail());

	        Authresponse response = new Authresponse();
	        response.setCoustmerdto(UserModelMapper.cvrtEntityToDto(entity));
	        response.setToken(jwt);
            response.setAddress(entity.getAddresses());
	        return response;
	    }

	    return null;
	}
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

		Users c = urepo.findByEmail(email);
		return new User(c.getEmail(), c.getOldPwd(), Collections.emptyList());
		
	}

	private String generatePWd() {
		String saltchar="ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
		Random ran= new Random();
		StringBuilder pwd= new StringBuilder();
		while (pwd.length()<5) {
		int index=ran.nextInt(saltchar.length());
		pwd.append(saltchar.charAt(index));
			
		}
		return pwd.toString();
	}

	@Override
	public Boolean forgotPwd(String email) {
		Users byEmail = urepo.findByEmail(email);
		
		if (byEmail!=null) {
			String oldPwd = byEmail.getOldPwd();
			 String pWd = generatePWd();
			 String encode = PwdEncode.encode(pWd);
			
			 byEmail.setOldPwd(encode);
			 urepo.save(byEmail);  
			String subject="forgot Password";
			String body="Your Password is "+pWd;
			 mailsend.mailsend(email, subject, body);
			return true;	
		}
		return false;
	}
}
