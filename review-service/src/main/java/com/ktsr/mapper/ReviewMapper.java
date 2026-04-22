package com.ktsr.mapper;

import com.ktsr.DTO.ReviewDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Review;
import lombok.Data;


public class ReviewMapper {

    public static ReviewDto toDto(Review review, UserDto userDto){
        ReviewDto reviewDto= new ReviewDto();
        reviewDto.setId(review.getId());
        reviewDto.setReviewText(review.getReviewText());
        reviewDto.setUser(userDto);
        reviewDto.setRating(review.getRating());
        reviewDto.setCreateAt(review.getCreatedAt());
        return reviewDto;
    }
}
