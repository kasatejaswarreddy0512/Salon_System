package com.ktsr.controller;

import com.ktsr.DTO.ReviewRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Review;
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
    public ResponseEntity<List<Review>> getReviewsBYSalonId(@PathVariable Long salonId) throws Exception {
        List<Review> reviews= reviewService.getReviewBySalonId(salonId);
        return ResponseEntity.ok(reviews);
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

    @DeleteMapping("/reviewId}")
    public ResponseEntity<String> deleteReview(@PathVariable Long reviewId,@RequestHeader("Authorization") String jwt) throws Exception {
        UserDto userDto=userFeignClient.getUserProfile(jwt).getBody();

        assert userDto != null;
        reviewService.deleteReview(reviewId, userDto.getId());
        return ResponseEntity.ok("Review has been deleted successfully...");
    }

}
