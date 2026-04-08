package com.ktsr.service.impl;

import com.ktsr.DTO.ReviewRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Review;
import com.ktsr.repository.ReviewRepository;
import com.ktsr.service.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {


    private final ReviewRepository reviewRepository;

    @Override
    public Review createReview(ReviewRequest request, SalonDto salonDto, UserDto userDto) {
        Review review = new Review();
        review.setReviewText(request.getReviewText());
        review.setRating(request.getRating());
        review.setUserId(userDto.getId());
        review.setSalonId(salonDto.getId());

        return reviewRepository.save(review);
    }

    @Override
    public List<Review> getReviewBySalonId(Long salonId) {
        return reviewRepository.findBySalonId(salonId);
    }

    private Review getReviewById(Long reviewId) {
        return reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not exists..."));
    }

    @Override
    public Review updateReview(ReviewRequest request, Long reviewId, Long userId) {
        Review review = getReviewById(reviewId);
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("You don't have permission to update this review");
        }
        review.setReviewText(request.getReviewText());
        review.setRating(request.getRating());

        return reviewRepository.save(review);
    }

    @Override
    public void deleteReview(Long reviewId, Long userId) {
        Review review = getReviewById(reviewId);
        if (!review.getUserId().equals(userId)) {
            throw new RuntimeException("You don't have permission to delete this review");
        }
        reviewRepository.delete(review);
    }
}
