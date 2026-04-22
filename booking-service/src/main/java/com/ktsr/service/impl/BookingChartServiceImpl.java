package com.ktsr.service.impl;

import com.ktsr.entity.Booking;
import com.ktsr.entity.BookingStatus;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class BookingChartServiceImpl {

    public List<Map<String, Object>> generateEarningChartData(List<Booking> bookings) {
        Map<String, Double> earningsByDay = bookings.stream()
                .collect(Collectors.groupingBy(
                        booking -> booking.getStartTime().toLocalDate().toString(),
                        Collectors.summingDouble(Booking::getTotalPrices)
                ));

        return convertToChartData(earningsByDay, "daily", "earnings");
    }

    public List<Map<String, Object>> generateBookingCountChartData(List<Booking> bookings) {
        Map<String, Long> countByDay = bookings.stream()
                .filter(booking -> booking.getStatus() == BookingStatus.CONFIRMED)
                .collect(Collectors.groupingBy(
                        booking -> booking.getStartTime().toLocalDate().toString(),
                        Collectors.counting()
                ));

        return convertToChartData(countByDay, "daily", "count");
    }

    private <T> List<Map<String, Object>> convertToChartData(Map<String, T> groupData, String period, String dataKey) {
        List<Map<String, Object>> chartData = new ArrayList<>();

        groupData.forEach((date, value) -> {
            Map<String, Object> dataPoint = new HashMap<>();
            dataPoint.put(period, date);
            dataPoint.put(dataKey, value);
            chartData.add(dataPoint);
        });

        chartData.sort(Comparator.comparing(dp -> dp.get(period).toString()));
        return chartData;
    }
}