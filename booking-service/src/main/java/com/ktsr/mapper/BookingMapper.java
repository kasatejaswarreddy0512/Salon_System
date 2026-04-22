package com.ktsr.mapper;

import com.ktsr.DTO.BookingDTO;
import com.ktsr.DTO.SalonDto;
import com.ktsr.DTO.ServiceDTO;
import com.ktsr.DTO.UserDto;
import com.ktsr.entity.Booking;

import java.util.List;
import java.util.Set;

public class BookingMapper {

    public static BookingDTO toDto(Booking booking,
                                   Set<ServiceDTO> services,
                                   UserDto user,
                                   SalonDto salon){
        BookingDTO bookingDTO = new BookingDTO();
        bookingDTO.setId(booking.getId());
        bookingDTO.setCustomerId(booking.getCustomerId());
        bookingDTO.setStatus(booking.getStatus());
        bookingDTO.setStartTime(booking.getStartTime());
        bookingDTO.setEndTime(booking.getEndTime());
        bookingDTO.setSalonId(booking.getSalonId());
        bookingDTO.setServiceIds(booking.getServiceIds());
        bookingDTO.setTotalPrices(booking.getTotalPrices());

        bookingDTO.setServices(services);
        bookingDTO.setUser(user);

        bookingDTO.setSalon(salon);

        return bookingDTO;

    }
}
