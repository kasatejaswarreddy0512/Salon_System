package com.ktsr.controller;

import com.ktsr.DTO.ReviewDto;
import com.ktsr.DTO.ReviewRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Review;
import com.ktsr.mapper.ReviewMapper;
import com.ktsr.service.ReviewService;
import com.ktsr.service.client.SalonFeignClient;
import com.ktsr.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/reviews")
public class ReviewController {

    private final ReviewService reviewService;
    private final UserFeignClient  userFeignClient;
    private final SalonFeignClient salonFeignClient;

    @PostMapping("/salon/{salonId}")
    public ResponseEntity<Review> saveReview(@RequestBody ReviewRequest request,
                                             @PathVariable Long salonId,
                                             @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto=userFeignClient.getUserProfile(jwt).getBody();
        SalonDto salonDto=salonFeignClient.getSalon(salonId).getBody();

        Review review = reviewService.createReview(request, salonDto, userDto);
        return ResponseEntity.ok(review);
    }

    @GetMapping("/salon/{salonId}")
    public ResponseEntity<List<ReviewDto>> getReviewsBYSalonId(@PathVariable Long salonId) throws Exception {

        SalonDto salon= salonFeignClient.getSalon(salonId).getBody();

        List<Review> reviews= reviewService.getReviewBySalonId(salon.getId());

        List<ReviewDto> reviewDtos=reviews.stream()
                .map((review)->{
                    UserDto user= null;
                    try {
                        user=userFeignClient.getUserById(review.getUserId()).getBody();
                    } catch (Exception e) {
                        throw new RuntimeException(e);
                    }
                    return ReviewMapper.toDto(review,user);
                }).toList();

        return ResponseEntity.ok(reviewDtos);
    }

    @PutMapping("/{reviewId}")
    public ResponseEntity<Review> updateReview(@RequestBody ReviewRequest request,
                                               @PathVariable Long reviewId,
                                               @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto=userFeignClient.getUserProfile(jwt).getBody();

        assert userDto != null;
        Review review= reviewService.updateReview(request,userDto.getId(),reviewId);
        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto=userFeignClient.getUserProfile(jwt).getBody();

        assert userDto != null;
        reviewService.deleteReview(reviewId, userDto.getId());
        return ResponseEntity.ok("Review has been deleted successfully...");
    }

}
