package com.ktsr.controller;


import com.ktsr.DTO.*;
import com.ktsr.entity.Booking;
import com.ktsr.entity.BookingStatus;
import com.ktsr.entity.SalonReport;
import com.ktsr.mapper.BookingMapper;
import com.ktsr.service.BookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookController {

    private final BookingService  bookingService;

    @PostMapping
    public ResponseEntity<Booking> createBooking(@RequestBody BookingRequest bookingRequest,
                                                 @RequestParam Long salonId){
        UserDto  userDto = new UserDto();
        userDto.setId(1L);

        SalonDto salonDto = new SalonDto();
        salonDto.setId(salonId);
        salonDto.setOpeningTime(LocalTime.now());
        salonDto.setClosingTime(LocalTime.now().plusHours(12));

        Set<ServiceDTO> serviceDTOSet = new HashSet<>();

        ServiceDTO serviceDTO = new ServiceDTO();
        serviceDTO.setId(1L);
        serviceDTO.setPrice(399);
        serviceDTO.setDuration(45);
        serviceDTO.setName("Hair cut for men");

        serviceDTOSet.add(serviceDTO);

        Booking booking=bookingService.createBooking(bookingRequest, userDto, salonDto,serviceDTOSet);

        return new ResponseEntity<>(booking,HttpStatus.CREATED);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingByCustomer(){
        List<Booking> bookings= bookingService.getBookingByCustomers(1L);

        return new ResponseEntity<>(getBookingDTOs(bookings),HttpStatus.OK);

    }


    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingBySalon(){

        List<Booking> bookings= bookingService.getBookingsBySalonId(1L);

        return new ResponseEntity<>(getBookingDTOs(bookings),HttpStatus.OK);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId){
        Booking booking= bookingService.getBookingById(1L);
        return new ResponseEntity<>(booking,HttpStatus.OK);
    }

    private  Set<BookingDTO>  getBookingDTOs(List<Booking> bookings){
        return bookings.stream()
                .map(booking -> {
                    return BookingMapper.toDto(booking);
                }).collect(Collectors.toSet());
    }


    @PutMapping("/{bookingId}/status")
    public ResponseEntity<Booking> updateBooking(@PathVariable Long bookingId,
                                                 @RequestParam BookingStatus status){
        Booking booking= bookingService.updateBooking(status,bookingId);
        return new ResponseEntity<>(booking,HttpStatus.OK);
    }

    @GetMapping("/slot/salon/{salonId}/date/{date}")
    public ResponseEntity<List<BookingSlotDTO>> getBookSlot(@PathVariable Long salonId,
                                                            @RequestParam(required = false) LocalDate date){
        List<Booking> booking= bookingService.getBookingByDate(date, salonId);

        List<BookingSlotDTO> slotsDTOs= booking.stream()
                .map(booking1 -> {
                    BookingSlotDTO bookingSlotDTO = new BookingSlotDTO();
                    bookingSlotDTO.setStartTime(booking1.getStartTime());
                    bookingSlotDTO.setEndTime(booking1.getEndTime());
                    return bookingSlotDTO;
                }).collect(Collectors.toList());

        return new ResponseEntity<>(slotsDTOs,HttpStatus.OK);
    }



    @GetMapping("/report")
    public ResponseEntity<SalonReport> getSalonReport(){

        SalonReport salonReport= bookingService.getSalonReport(1L);

        return new ResponseEntity<>(salonReport,HttpStatus.OK);

    }



}
