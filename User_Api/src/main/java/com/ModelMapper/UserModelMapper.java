package com.ModelMapper;

import org.modelmapper.ModelMapper;

import com.dto.UserDTO;
import com.entity.Users;

public class UserModelMapper {

    public static final ModelMapper mapper = new ModelMapper();

    // Entity to DTO
    public static UserDTO cvrtEntityToDto(Users entity) {

        return mapper.map(entity, UserDTO.class);
    }

    // DTO to Entity
    public static Users cvrDtoToEntity(UserDTO dto) {

        return mapper.map(dto, Users.class);
    }

}