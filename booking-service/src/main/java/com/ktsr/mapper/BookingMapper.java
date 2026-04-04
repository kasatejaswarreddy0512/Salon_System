package com.ktsr.mapper;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.entity.Booking;

public class BookingMapper {

    public static BookingDTO toDto(Booking booking){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setServiceIds(booking.getServiceIds());
        bookingDTO.setTotalPrices(booking.getTotalPrices());
        return bookingDTO;

    }
}
