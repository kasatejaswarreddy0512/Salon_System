package com.ktsr.category.service.controller;

import com.ktsr.category.service.DTO.SalonDto;
import com.ktsr.category.service.entity.Category;
import com.ktsr.category.service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/category/salon-owner")
@RequiredArgsConstructor
public class SalonCategoryController {

    private final CategoryService  categoryService;


    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category ) {
        SalonDto salonDto= new SalonDto();
        salonDto.setId(1L);
        return ResponseEntity.ok().body(categoryService.createCategory(category, salonDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(@PathVariable Long id) {
        SalonDto salonDto= new SalonDto();
        salonDto.setId(1L);
        categoryService.deleteCategoryById(id,salonDto.getId());
        return ResponseEntity.ok().body("Deleted Category Successfully...!");
    }
}
