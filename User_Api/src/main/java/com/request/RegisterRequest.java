package com.request;

import com.dto.AddressDTO;
import com.dto.UserDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    private UserDTO user;
    private AddressDTO address;
}