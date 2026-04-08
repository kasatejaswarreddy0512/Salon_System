package com.ktsr.service;

import com.ktsr.DTO.ReviewRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Review;

import java.util.List;

public interface ReviewService {

    Review createReview(ReviewRequest request, SalonDto salonDto, UserDto userDto);

    List<Review> getReviewBySalonId(Long salonId);

    Review updateReview(ReviewRequest request, Long reviewId, Long userId);

    void deleteReview(Long reviewId,  Long userId);


}
