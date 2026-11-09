package com.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Dto.ProductCategeoryDTO;
import com.Dto.ProductDTO;
import com.Dto.ProductRequestDTO;
import com.Dto.UserDTO;
import com.Dto.WishlistDTO;
import com.Mapper.CategeoryMapper;
import com.Mapper.ProductMapper;
import com.entity.ProductCategory;
import com.entity.Products;
import com.entity.Users;
import com.entity.Wishlist;
import com.repo.ProductCategeoryRepo;
import com.repo.ProductRepo;
import com.repo.UserRepo;
import com.repo.WhishlistRepo;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductCategeoryRepo crepo;

    @Autowired
    private ProductRepo prepo;
    
    @Autowired
    private UserRepo urepo;
    
    @Autowired
    private WhishlistRepo wrepo;

    @Override
    public List<ProductCategeoryDTO> findall() {

        return crepo.findAll()
                .stream()
                .map(CategeoryMapper::cvrtEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ProductDTO> findByProductsCategoryId(Long categoryId) {

        return prepo.findByCategoryId(categoryId)
                .stream()
                .map(ProductMapper::cvrtEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public ProductDTO findByProductId(Long id) {

        Optional<Products> product = prepo.findById(id);

        return product
                .map(ProductMapper::cvrtEntityToDto)
                .orElse(null);
    }

    @Override
    public List<ProductDTO> findByProductsName(String name) {

        return prepo.findByNameContainingIgnoreCase(name)
                .stream()
                .map(ProductMapper::cvrtEntityToDto)
                .collect(Collectors.toList());
    }

    @Override
    public String saveProduct(ProductRequestDTO dto) {

        try {

        	ProductCategory category = crepo.findById(dto.getCategoryId())
        	        .orElseThrow(() -> new RuntimeException("Category Not Found"));

        	System.out.println("Received CategoryId = " + dto.getCategoryId());
        	System.out.println("Received UserId = " + dto.getUserId());

        	Users user = urepo.findById(dto.getUserId())
        	        .orElseThrow(() -> new RuntimeException("User Not Found"));

            Products product = new Products();

            product.setName(dto.getName());
            product.setDescription(dto.getDescription());
            product.setUnitPrice(dto.getUnitPrice());
            product.setUnit(dto.getUnit());
            product.setUnitsInStock(dto.getUnitsInStock());
            product.setHarvestDate(dto.getHarvestDate());
            product.setOrganic(dto.isOrganic());
            product.setActive(dto.isActive());
            product.setLocation(dto.getLocation());

            product.setCategory(category);
            product.setUser(user);

            // Save image as byte[]
            if (dto.getImage() != null && !dto.getImage().isEmpty()) {
                product.setImage(dto.getImage().getBytes());
            }

            product.setDateCreated(new Date());
            product.setLastUpdate(new Date());

            prepo.save(product);

            return "Product Saved Successfully";

        } catch (Exception e) {
            e.printStackTrace();
            return "Failed To Save Product";
        }
    }

	@Override
	public List<ProductDTO> getProductsByUserId(Integer userId) {
		
		return prepo.findByUserUserId(userId).stream()
				.map(ProductMapper::cvrtEntityToDto).collect(Collectors.toList());
			
	}
	@Override
	public String updateProduct(ProductRequestDTO dto, Long id) throws IOException{

	    Products product = prepo.findById(id)
	        .orElseThrow(() -> new RuntimeException("Product not found"));

	    product.setName(dto.getName());
	    product.setDescription(dto.getDescription());
	    product.setUnitPrice(dto.getUnitPrice());
	    product.setUnit(dto.getUnit());
	    product.setUnitsInStock(dto.getUnitsInStock());
	    product.setLocation(dto.getLocation());
	    product.setOrganic(dto.isOrganic());
	    product.setActive(dto.isActive());

	    if(dto.getImage()!=null && !dto.getImage().isEmpty()){
	        product.setImage(dto.getImage().getBytes());
	    }

	    prepo.save(product);

	    return "Updated Successfully";
	}
	
	@Override
	@Transactional
	public String RemoveFromWishList(Integer userId, Long productId) {
        
		Users user = urepo.findById(userId)
		          .orElseThrow(()->new RuntimeException("user not found"));
		wrepo.deleteByUser_UserIdAndProduct_Id(userId, productId);

	    return "Removed From  Wishlist";
	}
	
	
	public Optional<Users> findByUserId(Integer userid) {
		 Optional<Users> byId = urepo.findById(userid);
		 return byId;
	}

	@Override
	public String addToWishList(Integer userId, Long productId) {
		 Wishlist wishlist = new Wishlist();

		    Users user = urepo.findById(userId)
		            .orElseThrow(() -> new RuntimeException("User not found"));

		    Products product = prepo.findById(productId)
		            .orElseThrow(() -> new RuntimeException("Product not found"));

		    wishlist.setUser(user);
		    wishlist.setProduct(product);

		    wrepo.save(wishlist);

		    return "Added to Wishlist";
	}

	@Override
	public List<WishlistDTO> GetWishlist(Integer id) {

	    List<Wishlist> all = wrepo.findByUser_UserId(id);

	    List<WishlistDTO> result = new ArrayList<>();

	    for (Wishlist w : all) {

	        // -------------------------
	        // Wishlist DTO
	        // -------------------------
	        WishlistDTO wdto = new WishlistDTO();

	        wdto.setId(w.getId());


	        // -------------------------
	        // User DTO
	        // -------------------------
	        UserDTO udto = new UserDTO();

	        udto.setId(w.getUser().getUserId());
	        udto.setName(w.getUser().getName());
	        udto.setEmail(w.getUser().getEmail());
	        udto.setPhno(w.getUser().getPhno());
	        udto.setRole(w.getUser().getRole());

	        wdto.setUser(udto);


	        // -------------------------
	        // Product DTO
	        // -------------------------
	        ProductDTO pdto = new ProductDTO();

	        pdto.setId(w.getProduct().getId());
	        pdto.setName(w.getProduct().getName());
	        pdto.setDescription(w.getProduct().getDescription());
	        pdto.setUnitPrice(w.getProduct().getUnitPrice());
	        pdto.setUnit(w.getProduct().getUnit());
	        pdto.setUnitsInStock(w.getProduct().getUnitsInStock());
	        pdto.setHarvestDate(w.getProduct().getHarvestDate());
	        pdto.setOrganic(w.getProduct().isOrganic());
	        pdto.setActive(w.getProduct().isActive());
	        pdto.setLocation(w.getProduct().getLocation());
	        if (w.getProduct().getImage() != null) {
	            pdto.setImage(
	                Base64.getEncoder().encodeToString(
	                    w.getProduct().getImage()
	                )
	            );
	        }

	        // Category
	        pdto.setCategoryId(
	                w.getProduct().getCategory().getId()
	        );

	        pdto.setCategoryName(
	                w.getProduct().getCategory().getCategoryName()
	        );

	        // Dates
	        pdto.setDateCreated(w.getProduct().getDateCreated());
	        pdto.setLastUpdate(w.getProduct().getLastUpdate());

	        wdto.setProduct(pdto);


	        // -------------------------
	        // Add to result
	        // -------------------------
	        result.add(wdto);
	    }

	    return result;
	}

    
    
}