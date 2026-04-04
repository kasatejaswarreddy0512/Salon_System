package com.ktsr.repository;

import com.ktsr.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByCustomerId(long customerId);
    List<Booking> findBySalonId(long salonId);
}
