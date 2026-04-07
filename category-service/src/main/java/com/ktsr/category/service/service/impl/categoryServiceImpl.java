package com.ktsr.category.service.service.impl;

import com.ktsr.category.service.DTO.SalonDto;
import com.ktsr.category.service.entity.Category;
import com.ktsr.category.service.repository.CategoryRepository;
import com.ktsr.category.service.service.CategoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class categoryServiceImpl  implements CategoryService {


    private final CategoryRepository categoryRepository;

    @Override
    public Category createCategory(Category category, SalonDto salonDto) {
        Category newCategory = new Category();
        newCategory.setId(category.getId());
        newCategory.setName(category.getName());
        newCategory.setSalonId(category.getSalonId());
        newCategory.setImage(category.getImage());
        return categoryRepository.save(newCategory);
    }

    @Override
    public Category getCategoryById(Long id) {
        Category category = categoryRepository.findById(id).orElse(null);
        if (category == null) {
            throw new RuntimeException("Category not found with id " + id);
        }
        return category;
    }

    @Override
    public Set<Category> getAllCategoriesBySalonId(Long salonId) {
        return categoryRepository.findBySalonId(salonId);
    }

    @Override
    public void deleteCategoryById(Long id, Long salonId) {
        Category category= getCategoryById(id);
        if (category.getSalonId() == salonId) {
            throw  new RuntimeException("You don't have the same salonId to delete this Category");
        }
        categoryRepository.deleteById(id);
    }

    @Override
    public Category getByIdAndSalonId(Long id, Long salonId) {
        Category category =categoryRepository.findByIdAndSalonId(id,salonId);
        if (category == null) {
            throw new RuntimeException("Category not found with id " + id);
        }
        return  category;
    }
}
