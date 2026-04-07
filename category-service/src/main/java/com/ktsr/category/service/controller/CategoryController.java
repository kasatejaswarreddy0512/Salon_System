package com.ktsr.category.service.controller;

import com.ktsr.category.service.DTO.SalonDto;
import com.ktsr.category.service.entity.Category;
import com.ktsr.category.service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
public class CategoryController {

    private final CategoryService categoryService;

    @PostMapping
    public ResponseEntity<Category> createCategory(@RequestBody Category category, SalonDto salonDto) {
        return ResponseEntity.ok().body(categoryService.createCategory(category, salonDto));
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<Set<Category>> getAllCategoriesBySalonId(@PathVariable Long salonId) {
        return ResponseEntity.ok().body(categoryService.getAllCategoriesBySalonId(salonId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Category> getCategoryById(@PathVariable Long id){
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCategoryById(Long id,Long salonId) {
        categoryService.deleteCategoryById(id,salonId);
        return ResponseEntity.ok().body("Deleted Category Successfully...!");
    }



}
