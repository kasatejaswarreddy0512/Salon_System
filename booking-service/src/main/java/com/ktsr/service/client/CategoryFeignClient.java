package com.ktsr.service.offering.service.client;

import com.ktsr.service.offering.DTO.CategoryDto;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(value = "CATEGORY-SERVICE", url = "http://localhost:8083")
public interface CategoryFeignClient {

//    @GetMapping("/api/category/{id}")
//    public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Long id);

    @GetMapping("/api/category/salon-owner/salon/{salonId}/category/{id}")
    public ResponseEntity<CategoryDto> getCategoryByIdAndSalon(@PathVariable Long id,
                                                            @PathVariable Long salonId);

}
