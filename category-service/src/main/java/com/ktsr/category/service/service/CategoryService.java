package com.ktsr.category.service.service;

import com.ktsr.category.service.DTO.SalonDto;
import com.ktsr.category.service.entity.Category;

import java.util.Set;

public interface CategoryService {


    Category createCategory(Category category, SalonDto salonDto);
    Category getCategoryById(Long id);
    Set<Category> getAllCategoriesBySalonId(Long salonId);
    void deleteCategoryById(Long id,Long salonId);
}
