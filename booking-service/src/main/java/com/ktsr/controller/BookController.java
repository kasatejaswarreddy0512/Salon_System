package com.ktsr.controller;


import com.ktsr.DTO.*;
import com.ktsr.entity.Booking;
import com.ktsr.entity.BookingStatus;
import com.ktsr.entity.SalonReport;
import com.ktsr.mapper.BookingMapper;
import com.ktsr.service.BookingService;
import com.ktsr.service.client.PaymentFeignClient;
import com.ktsr.service.client.SalonFeignClient;
import com.ktsr.service.client.ServiceOfferingFeignClient;
import com.ktsr.service.client.UserFeignClient;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/bookings")
public class BookController {

    private final BookingService  bookingService;
    private final SalonFeignClient salonFeignClient;
    private final UserFeignClient userFeignClient;
    private final ServiceOfferingFeignClient  serviceOfferingFeignClient;
    private  final PaymentFeignClient paymentFeignClient;


    @PostMapping
    public ResponseEntity<PaymentLinkResponse> createBooking(@RequestBody BookingRequest bookingRequest,
                                                 @RequestParam Long salonId,
                                                 @RequestParam PaymentMethod paymentMethod,
                                                 @RequestHeader("Authorization") String jwt) throws Exception {
        UserDto  userDto = userFeignClient.getUserProfile(jwt).getBody();


        SalonDto salonDto = salonFeignClient.getSalon(salonId).getBody();

        Set<ServiceDTO> serviceDTOSet = serviceOfferingFeignClient.getServicesBySalonIds(bookingRequest.getServiceIds()).getBody();

        if(serviceDTOSet.isEmpty()){
            throw new  Exception("Service not found...!");
        }

        Booking booking=bookingService.createBooking(bookingRequest, userDto, salonDto,serviceDTOSet);

        BookingDTO bookingDTO = BookingMapper.toDto(booking);

         PaymentLinkResponse response= paymentFeignClient.createPaymentLink(bookingDTO, paymentMethod, jwt).getBody();

        return new ResponseEntity<>(response,HttpStatus.CREATED);
    }

    @GetMapping("/customer")
    public ResponseEntity<Set<BookingDTO>> getBookingByCustomer(@RequestHeader("Authorization") String jwt) throws Exception {

        UserDto  userDto = userFeignClient.getUserProfile(jwt).getBody();

        if (userDto==null || userDto.getId() == null) {
            throw new RuntimeException("User is not found");
        }
        List<Booking> bookings= bookingService.getBookingByCustomers(userDto.getId());

        return new ResponseEntity<>(getBookingDTOs(bookings),HttpStatus.OK);
    }


    @GetMapping("/salon")
    public ResponseEntity<Set<BookingDTO>> getBookingBySalon(@RequestHeader("Authorization") String jwt) throws Exception {

        SalonDto salonDto=salonFeignClient.getSalonByOwnerId(jwt).getBody();

        if (salonDto==null || salonDto.getId() == null) {
            throw new RuntimeException("Salon is not found");
        }
        List<Booking> bookings= bookingService.getBookingsBySalonId(salonDto.getId());

        return new ResponseEntity<>(getBookingDTOs(bookings),HttpStatus.OK);
    }

    @GetMapping("/{bookingId}")
    public ResponseEntity<Booking> getBookingById(@PathVariable Long bookingId){
        Booking booking= bookingService.getBookingById(bookingId);
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
    public ResponseEntity<SalonReport> getSalonReport(@RequestHeader("Authorization") String jwt) throws Exception {

        SalonDto salonDto=salonFeignClient.getSalonByOwnerId(jwt).getBody();
        if (salonDto==null || salonDto.getId() == null) {
            throw new RuntimeException("Salon is not found");
        }
        SalonReport salonReport= bookingService.getSalonReport(salonDto.getId());

        return new ResponseEntity<>(salonReport,HttpStatus.OK);

    }
}
