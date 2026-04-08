package com.ktsr.service;

import com.ktsr.DTO.BookingRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.ServiceDTO;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Booking;
import com.ktsr.entity.BookingStatus;
import com.ktsr.entity.PaymentOrder;
import com.ktsr.entity.SalonReport;

import java.awt.print.Book;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

public interface BookingService {

    Booking createBooking(BookingRequest bookingRequest,
                          UserDto userDto,
                          SalonDto salonDto,
                          Set<ServiceDTO> serviceDTOs);

    List<Booking> getBookingByCustomers(Long customerId);
    List<Booking> getBookingsBySalonId(Long salonId);
    Booking getBookingById(Long id);
    Booking updateBooking(BookingStatus status, Long id);
    List<Booking> getBookingByDate(LocalDate date, Long salonId);

    SalonReport getSalonReport(Long salonId);

    Booking bookingSuccess(PaymentOrder paymentOrder);
}
