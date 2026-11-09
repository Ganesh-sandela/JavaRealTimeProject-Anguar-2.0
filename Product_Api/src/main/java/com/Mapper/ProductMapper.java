package com.Mapper;

import java.util.Base64;

import org.modelmapper.Converter;
import org.modelmapper.ModelMapper;

import com.Dto.ProductDTO;
import com.entity.Products;

public class ProductMapper {

    private static final ModelMapper mapper = new ModelMapper();

    static {

        Converter<byte[], String> imageConverter =
                ctx -> ctx.getSource() == null
                        ? null
                        : Base64.getEncoder().encodeToString(ctx.getSource());

        mapper.typeMap(Products.class, ProductDTO.class)
              .addMappings(m -> m.using(imageConverter)
                                 .map(Products::getImage, ProductDTO::setImage));
    }

    public static ProductDTO cvrtEntityToDto(Products entity) {
        return mapper.map(entity, ProductDTO.class);
    }

    public static Products cvrDtoToEntity(ProductDTO dto) {
        return mapper.map(dto, Products.class);
    }
}