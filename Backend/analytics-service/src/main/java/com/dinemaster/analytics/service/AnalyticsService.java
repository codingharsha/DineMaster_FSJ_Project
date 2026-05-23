package com.dinemaster.analytics.service;

import com.dinemaster.analytics.client.MenuClient;
import com.dinemaster.analytics.client.OrderClient;
import com.dinemaster.analytics.client.ReservationClient;
import com.dinemaster.analytics.model.*;
import com.dinemaster.analytics.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired private MenuClient menuClient;
    @Autowired private OrderClient orderClient;
    @Autowired private ReservationClient reservationClient;

    @Autowired private FeedbackRepository feedbackRepository;
    @Autowired private SalesReportRepository salesReportRepository;
    @Autowired private StaffRepository staffRepository;
    @Autowired private RestaurantSettingsRepository settingsRepository;

    // ─── DASHBOARD STATS ──────────────────────────────────────────────────────

    public AnalyticsData getDashboardStats() {
        List<Object> menuItems = Collections.emptyList();
        List<Object> orders = Collections.emptyList();
        List<Object> reservations = Collections.emptyList();

        try { menuItems = menuClient.getAllItems(); } catch (Exception ignored) { }
        try { orders = orderClient.getAllOrders(); } catch (Exception ignored) { }
        try { reservations = reservationClient.getAllReservations(); } catch (Exception ignored) { }

        AnalyticsData data = new AnalyticsData();
        data.setTotalMenuCount(menuItems.size());
        data.setTotalOrdersCount(orders.size());
        data.setTotalReservationsCount(reservations != null ? reservations.size() : 0);
        data.setTotalRevenueEstimate(orders.size() * 250.0);
        return data;
    }

    // ─── SALES REPORTS ────────────────────────────────────────────────────────

    public SalesReport getTodayReport() {
        LocalDate today = LocalDate.now();
        Optional<SalesReport> todayReport = salesReportRepository.findByDate(today);
        if (todayReport.isPresent()) {
            SalesReport report = todayReport.get();
            if (!isPlaceholderReport(report)) {
                return report;
            }
            return salesReportRepository.findTopByTotalRevenueGreaterThanOrderByDateDesc(0.0)
                    .orElse(report);
        }

        return salesReportRepository.findTopByTotalRevenueGreaterThanOrderByDateDesc(0.0)
                .or(() -> salesReportRepository.findTopByOrderByDateDesc())
                .orElseGet(() -> generateDailyReport(today));
    }

    public List<SalesReport> getWeeklyReports() {
        LocalDate from = LocalDate.now().minusDays(6);
        List<SalesReport> reports = salesReportRepository.findByDateBetween(from, LocalDate.now());
        if (!reports.isEmpty()) return reports;
        return salesReportRepository.findTop7ByOrderByDateDesc();
    }

    public List<SalesReport> getMonthlyReports() {
        LocalDate from = LocalDate.now().withDayOfMonth(1);
        List<SalesReport> reports = salesReportRepository.findByDateBetween(from, LocalDate.now());
        if (!reports.isEmpty()) return reports;
        return salesReportRepository.findTop30ByOrderByDateDesc();
    }

    public List<SalesReport> getYearlyReports() {
        LocalDate from = LocalDate.now().withDayOfYear(1);
        List<SalesReport> reports = salesReportRepository.findByDateBetween(from, LocalDate.now());
        if (!reports.isEmpty()) return reports;
        return salesReportRepository.findTop365ByOrderByDateDesc();
    }

    private SalesReport generateDailyReport(LocalDate date) {
        List<Object> orders = Collections.emptyList();
        try {
            orders = orderClient.getAllOrders();
        } catch (Exception ignored) {
            // Keep sales report endpoint resilient when order-service is temporarily unavailable.
        }
        int count = orders.size();
        double revenue = count * 250.0;

        Map<String, Integer> topDishes = new LinkedHashMap<>();
        if (count > 0) {
            topDishes.put("Chicken Biryani", 45);
            topDishes.put("Paneer Butter Masala", 32);
            topDishes.put("Butter Naan", 80);
        }

        Map<String, Double> revByCategory = new LinkedHashMap<>();
        revByCategory.put("Main Course", revenue * 0.5);
        revByCategory.put("Starters", revenue * 0.2);
        revByCategory.put("Beverages", revenue * 0.15);
        revByCategory.put("Desserts", revenue * 0.15);

        SalesReport report = new SalesReport();
        report.setDate(date);
        report.setPeriod("DAILY");
        report.setTotalRevenue(revenue);
        report.setTotalOrders(count);
        report.setTotalCovers(count * 2);
        report.setAvgOrderValue(count > 0 ? revenue / count : 0);
        report.setTopDishes(topDishes);
        report.setRevenueByCategory(revByCategory);
        return salesReportRepository.save(report);
    }

    // ─── FEEDBACK ─────────────────────────────────────────────────────────────

    public Feedback submitFeedback(Feedback feedback) {
        feedback.setCreatedAt(LocalDateTime.now());
        feedback.setSentiment(computeSentiment(feedback.getDishRating(), feedback.getServiceRating()));
        return feedbackRepository.save(feedback);
    }

    public List<Feedback> getAllFeedback() {
        return feedbackRepository.findAll();
    }

    public List<Feedback> getFeedbackBySentiment(String sentiment) {
        return feedbackRepository.findBySentiment(sentiment);
    }

    public Feedback replyToFeedback(String id, String reply) {
        Feedback fb = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        fb.setAdminReply(reply);
        return feedbackRepository.save(fb);
    }

    public Feedback flagFeedback(String id, boolean flagged) {
        Feedback fb = feedbackRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Feedback not found"));
        fb.setFlagged(flagged);
        return feedbackRepository.save(fb);
    }

    public void deleteFeedback(String id) {
        feedbackRepository.deleteById(id);
    }

    public Map<String, Object> getFeedbackSummary() {
        List<Feedback> all = feedbackRepository.findAll();
        long positive = all.stream().filter(f -> "positive".equals(f.getSentiment())).count();
        long neutral  = all.stream().filter(f -> "neutral".equals(f.getSentiment())).count();
        long negative = all.stream().filter(f -> "negative".equals(f.getSentiment())).count();
        double avgRating = all.stream().mapToInt(Feedback::getDishRating).average().orElse(0);

        Map<String, Object> summary = new HashMap<>();
        summary.put("total", all.size());
        summary.put("positive", positive);
        summary.put("neutral", neutral);
        summary.put("negative", negative);
        summary.put("averageRating", avgRating);
        return summary;
    }

    private String computeSentiment(int dishRating, int serviceRating) {
        double avg = (dishRating + serviceRating) / 2.0;
        if (avg >= 4.0) return "positive";
        if (avg >= 2.5) return "neutral";
        return "negative";
    }

    private boolean isPlaceholderReport(SalesReport report) {
        return report.getTotalRevenue() <= 0
                && report.getTotalOrders() <= 0
                && report.getTotalCovers() <= 0;
    }

    // ─── STAFF ────────────────────────────────────────────────────────────────

    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    public Staff addStaff(Staff staff) {
        return staffRepository.save(staff);
    }

    public Staff updateStaff(String id, Staff updated) {
        updated.setId(id);
        return staffRepository.save(updated);
    }

    public void deleteStaff(String id) {
        staffRepository.deleteById(id);
    }

    public Staff reportIssue(String id) {
        Staff staff = staffRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Staff not found"));
        staff.setIssuesReported(staff.getIssuesReported() + 1);
        return staffRepository.save(staff);
    }

    // ─── SETTINGS ─────────────────────────────────────────────────────────────

    public RestaurantSettings getSettings() {
        List<RestaurantSettings> all = settingsRepository.findAll();
        if (all.isEmpty()) {
            RestaurantSettings defaults = new RestaurantSettings();
            defaults.setRestaurantName("DineMaster");
            defaults.setContactPhone("+91 99887 76655");
            defaults.setAddress("123 Food Street, Flavor Town");
            defaults.setCurrentStatus("Open for Business");
            defaults.setTaxRate(5.0);
            defaults.setServiceCharge(10.0);
            defaults.setCurrency("Indian Rupee (₹)");
            defaults.setWeekdayOpen("09:00");
            defaults.setWeekdayClose("22:00");
            defaults.setWeekendOpen("10:00");
            defaults.setWeekendClose("23:00");
            return settingsRepository.save(defaults);
        }
        return all.get(0);
    }

    public RestaurantSettings saveSettings(RestaurantSettings settings) {
        List<RestaurantSettings> all = settingsRepository.findAll();
        if (!all.isEmpty()) settings.setId(all.get(0).getId());
        return settingsRepository.save(settings);
    }
}
