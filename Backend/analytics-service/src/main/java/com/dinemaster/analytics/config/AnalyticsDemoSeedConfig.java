package com.dinemaster.analytics.config;

import com.dinemaster.analytics.model.Feedback;
import com.dinemaster.analytics.model.RestaurantSettings;
import com.dinemaster.analytics.model.SalesReport;
import com.dinemaster.analytics.model.Staff;
import com.dinemaster.analytics.repository.FeedbackRepository;
import com.dinemaster.analytics.repository.RestaurantSettingsRepository;
import com.dinemaster.analytics.repository.SalesReportRepository;
import com.dinemaster.analytics.repository.StaffRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.autoconfigure.condition.ConditionalOnProperty;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Configuration
public class AnalyticsDemoSeedConfig {

    @Bean
    @ConditionalOnProperty(name = "analytics.seed.demo.enabled", havingValue = "true", matchIfMissing = true)
    CommandLineRunner seedAnalyticsDemoData(
            SalesReportRepository salesRepo,
            FeedbackRepository feedbackRepo,
            StaffRepository staffRepo,
            RestaurantSettingsRepository settingsRepo
    ) {
        return args -> {
            if (salesRepo.count() < 20) {
                List<SalesReport> reports = new ArrayList<>();
                for (int i = 45; i >= 0; i--) {
                    LocalDate date = LocalDate.now().minusDays(i);
                    double weekendBoost = (date.getDayOfWeek().getValue() >= 5) ? 1.22 : 1.0;
                    int baseOrders = 140 + ((i * 17) % 45);
                    int totalOrders = (int) Math.round(baseOrders * weekendBoost);
                    double avgOrderValue = 290 + ((i * 13) % 110);
                    double totalRevenue = totalOrders * avgOrderValue;

                    Map<String, Integer> topDishes = new LinkedHashMap<>();
                    topDishes.put("Chicken Biryani", 28 + ((i * 7) % 25));
                    topDishes.put("Paneer Butter Masala", 20 + ((i * 5) % 18));
                    topDishes.put("Butter Naan", 30 + ((i * 11) % 22));
                    topDishes.put("Hakka Noodles", 14 + ((i * 3) % 14));

                    Map<String, Double> category = new LinkedHashMap<>();
                    category.put("Main Course", totalRevenue * 0.48);
                    category.put("Starters", totalRevenue * 0.20);
                    category.put("Beverages", totalRevenue * 0.14);
                    category.put("Desserts", totalRevenue * 0.18);

                    SalesReport report = new SalesReport();
                    report.setDate(date);
                    report.setPeriod("DAILY");
                    report.setTotalRevenue(Math.round(totalRevenue));
                    report.setTotalOrders(totalOrders);
                    report.setTotalCovers(totalOrders * 2);
                    report.setAvgOrderValue(avgOrderValue);
                    report.setTopDishes(topDishes);
                    report.setRevenueByCategory(category);
                    reports.add(report);
                }
                salesRepo.saveAll(reports);
            }

            if (feedbackRepo.count() < 20) {
                List<Feedback> feedbacks = List.of(
                        buildFeedback("Aarav", "9988776611", "Chicken Biryani", 5, 5, "Absolutely loved the aroma and spice balance. Will order again.", "positive", false, "Thank you, Aarav. Glad you enjoyed it.", 1),
                        buildFeedback("Nitya", "9988776622", "Margherita Pizza", 4, 4, "Good crust and cheese pull. Could use a little more basil.", "positive", false, "Noted. We will pass this to the chef team.", 2),
                        buildFeedback("Rahul", "9988776633", "Cold Coffee", 3, 3, "Taste was fine but delivery took longer than expected.", "neutral", false, "Sorry about the delay. We are improving dispatching.", 3),
                        buildFeedback("Sneha", "9988776644", "Paneer Tikka", 5, 4, "Super soft paneer and smoky flavor.", "positive", false, "", 4),
                        buildFeedback("Ishaan", "9988776655", "Garlic Naan", 2, 2, "Naan arrived cold and too chewy.", "negative", true, "We are sorry. We have escalated this to kitchen QA.", 5),
                        buildFeedback("Megha", "9988776666", "Veg Fried Rice", 4, 5, "Portion size and quality were excellent.", "positive", false, "", 6),
                        buildFeedback("Varun", "9988776677", "Tandoori Platter", 3, 4, "Good variety, but one item was under-seasoned.", "neutral", false, "", 7),
                        buildFeedback("Pooja", "9988776688", "Chocolate Brownie", 5, 5, "Warm brownie with ice cream was perfect.", "positive", false, "Happy to hear that. Thank you.", 8)
                );
                feedbackRepo.saveAll(feedbacks);
            }

            if (staffRepo.count() < 6) {
                List<Staff> staff = List.of(
                        new Staff(null, "Arjun Rao", "Head Chef", "9876543210", "arjun@dinemaster.com", "8 years", "2023-03-12", 65000, "Active", 92, 0, true, "1st of every month", "09:00", "17:00"),
                        new Staff(null, "Meera Singh", "Sous Chef", "9876501234", "meera@dinemaster.com", "5 years", "2024-01-08", 42000, "Active", 86, 1, false, "1st of every month", "10:00", "18:00"),
                        new Staff(null, "Rahul Das", "Line Cook", "9876598765", "rahul@dinemaster.com", "3 years", "2024-09-21", 30000, "Active", 78, 0, false, "1st of every month", "12:00", "20:00"),
                        new Staff(null, "Kavita Menon", "Prep Cook", "9876540001", "kavita@dinemaster.com", "2 years", "2025-02-10", 26000, "Active", 81, 0, false, "1st of every month", "08:00", "16:00"),
                        new Staff(null, "Sohail Khan", "Pastry Chef", "9876540002", "sohail@dinemaster.com", "6 years", "2022-07-01", 47000, "Inactive", 74, 2, false, "1st of every month", "11:00", "19:00")
                );
                staffRepo.saveAll(staff);
            }

            if (settingsRepo.count() == 0) {
                RestaurantSettings settings = new RestaurantSettings();
                settings.setRestaurantName("DineMaster");
                settings.setContactPhone("+91 99887 76655");
                settings.setAddress("123 Food Street, Flavor Town");
                settings.setCurrentStatus("Open for Business");
                settings.setTaxRate(5.0);
                settings.setServiceCharge(10.0);
                settings.setCurrency("Indian Rupee (Rs.)");
                settings.setWeekdayOpen("09:00");
                settings.setWeekdayClose("22:00");
                settings.setWeekendOpen("10:00");
                settings.setWeekendClose("23:00");
                settingsRepo.save(settings);
            }
        };
    }

    private Feedback buildFeedback(
            String customer, String phone, String dish, int dishRating, int serviceRating,
            String comment, String sentiment, boolean flagged, String reply, int daysAgo
    ) {
        Feedback f = new Feedback();
        f.setCustomerName(customer);
        f.setCustomerPhone(phone);
        f.setDishName(dish);
        f.setDishRating(dishRating);
        f.setServiceRating(serviceRating);
        f.setComment(comment);
        f.setSentiment(sentiment);
        f.setFlagged(flagged);
        f.setAdminReply(reply);
        f.setCreatedAt(LocalDateTime.now().minusDays(daysAgo));
        return f;
    }
}
