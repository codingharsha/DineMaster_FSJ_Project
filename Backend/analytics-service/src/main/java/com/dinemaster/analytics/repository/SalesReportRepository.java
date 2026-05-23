package com.dinemaster.analytics.repository;

import com.dinemaster.analytics.model.SalesReport;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface SalesReportRepository extends MongoRepository<SalesReport, String> {
    Optional<SalesReport> findByDate(LocalDate date);
    List<SalesReport> findByPeriod(String period);
    List<SalesReport> findByDateBetween(LocalDate from, LocalDate to);
    Optional<SalesReport> findTopByOrderByDateDesc();
    Optional<SalesReport> findTopByTotalRevenueGreaterThanOrderByDateDesc(double totalRevenue);
    List<SalesReport> findTop7ByOrderByDateDesc();
    List<SalesReport> findTop30ByOrderByDateDesc();
    List<SalesReport> findTop365ByOrderByDateDesc();
}
