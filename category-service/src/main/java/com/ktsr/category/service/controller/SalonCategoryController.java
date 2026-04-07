package com.ktsr.category.service.controller;

import com.ktsr.category.service.DTO.SalonDto;
import com.ktsr.category.service.entity.Category;
import com.ktsr.category.service.service.CategoryService;
import com.ktsr.category.service.service.client.SalonFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category/salon-owner")
@RequiredArgsConstructor
public class SalonCategoryController {

    private final CategoryService  categoryService;
    private final SalonFeignClient salonFeignClient;


    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category,
                                                   @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDto salonDto= salonFeignClient.getSalonByOwnerId(jwt).getBody();

        return ResponseEntity.ok().body(categoryService.createCategory(category, salonDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id,
                                                     @RequestHeader("Authorization") String jwt) throws Exception {
        SalonDto salonDto= salonFeignClient.getSalonByOwnerId(jwt).getBody();
        categoryService.deleteCategoryById(id,salonDto.getId());
        return ResponseEntity.ok().body("Deleted Category Successfully...!");
    }

    @GetMapping("/salon/{salonId}/category/{id}")
    public ResponseEntity<Category> getCategoryByIdAndSalon(@PathVariable Long id,
                                                            @PathVariable Long salonId) {

        Category category=categoryService.getByIdAndSalonId(id,salonId);
        return ResponseEntity.ok(category);
    }
}
