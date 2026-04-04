package com.ktsr.service.impl;

import com.ktsr.DTO.BookingRequest;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.ServiceDTO;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Booking;
import com.ktsr.entity.BookingStatus;
import com.ktsr.entity.SalonReport;
import com.ktsr.repository.BookingRepository;
import com.ktsr.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;

    @Override
    public Booking createBooking(BookingRequest booking,
                                 UserDto userDto,
                                 SalonDto salonDto,
                                 Set<ServiceDTO> serviceDTOSet) {

        int totalDuration = serviceDTOSet.stream().mapToInt(ServiceDTO::getDuration).sum();
        LocalDateTime bookingStartTime = booking.getStartTime();
        LocalDateTime bookingEndTime = bookingStartTime.plusMinutes(totalDuration);

        Boolean isSlotAvailable = isTimeSlotAvailable(salonDto, bookingStartTime, bookingEndTime);

        Double totalPrice = serviceDTOSet.stream()
                .mapToDouble(ServiceDTO::getPrice)
                .sum();

        Set<Long> idList = serviceDTOSet.stream()
                .map(ServiceDTO::getId)
                .collect(Collectors.toSet());

        Booking newBooking = new Booking();
        newBooking.setCustomerId(userDto.getId());
        newBooking.setSalonId(salonDto.getId());
        newBooking.setServiceIds(idList);
        newBooking.setStatus(BookingStatus.PENDING);
        newBooking.setStartTime(bookingStartTime);
        newBooking.setEndTime(bookingEndTime);
        newBooking.setTotalPrices(totalPrice);

        return bookingRepository.save(newBooking);
    }

    public boolean isTimeSlotAvailable(SalonDto salonDto,
                                       LocalDateTime bookingStartTime,
                                       LocalDateTime bookingEndTime) {

        List<Booking> existingBooking = getBookingsBySalonId(salonDto.getId());

        LocalDateTime salonOpenTime = salonDto.getOpeningTime().atDate(bookingStartTime.toLocalDate());
        LocalDateTime salonCloseTime = salonDto.getClosingTime().atDate(bookingStartTime.toLocalDate());

        if (salonOpenTime.isBefore(salonCloseTime) || bookingEndTime.isAfter(salonCloseTime)) {
            throw new RuntimeException("Booking time must be with in salon working hours");
        }

        for (Booking booking : existingBooking) {
            LocalDateTime existingBookingStartTime = booking.getStartTime();
            LocalDateTime existingBookingEndTime = booking.getEndTime();

            if (bookingStartTime.isBefore(existingBookingEndTime) &&
                    bookingEndTime.isAfter(existingBookingStartTime)) {
                throw new RuntimeException("Slot not available choose different time");
            }

            if (bookingStartTime.isEqual(existingBookingStartTime) ||
                    bookingEndTime.isEqual(existingBookingEndTime)) {
                throw new RuntimeException("Slot not available choose different time");
            }
        }
        return true;

    }

    @Override
    public List<Booking> getBookingByCustomers(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Override
    public List<Booking> getBookingsBySalonId(Long salonId) {
        return bookingRepository.findBySalonId(salonId);
    }

    @Override
    public Booking getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id).orElse(null);
        if (booking == null) {
            throw new RuntimeException("Booking not found");
        }
        return booking;
    }

    @Override
    public Booking updateBooking(BookingStatus status, Long id) {
        Booking booking = getBookingById(id);
        booking.setStatus(status);

        return bookingRepository.save(booking);
    }

    @Override
    public List<Booking> getBookingByDate(LocalDate date, Long salonId) {
        List<Booking> allBookings = getBookingsBySalonId(salonId);

        if (date == null) {
            return allBookings;
        }

        return allBookings.stream()
                .filter(booking -> isSameDate(booking.getStartTime(), date) ||
                        isSameDate(booking.getEndTime(), date))
                .collect(Collectors.toList());
    }

    private boolean isSameDate(LocalDateTime dateTime, LocalDate date) {
        return dateTime.toLocalDate().equals(date);

    }

    @Override
    public SalonReport getSalonReport(Long salonId) {
        List<Booking> bookings = getBookingsBySalonId(salonId);
        Double totalEarnings=bookings.stream()
                .mapToDouble(Booking::getTotalPrices)
                .sum();
        Integer totalBookings = bookings.size();

        List<Booking> cancelledBookings=bookings.stream()
                .filter(booking -> booking.getStatus().equals(BookingStatus.CANCELLED))
                .collect(Collectors.toList());

        Double totalRefund= cancelledBookings.stream()
                .mapToDouble(Booking::getTotalPrices)
                .sum();

        SalonReport salonReport = new SalonReport();
        salonReport.setSalonId(salonId);
        salonReport.setCancelBookings(cancelledBookings.size());
        salonReport.setTotalBookings(totalBookings);
        salonReport.setTotalEarnings(totalEarnings);
        salonReport.setTotalRefund(totalRefund);


        return salonReport;
    }
}
