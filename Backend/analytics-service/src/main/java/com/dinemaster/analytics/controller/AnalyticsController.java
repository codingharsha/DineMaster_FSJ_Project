package com.dinemaster.analytics.controller;

import com.dinemaster.analytics.model.*;
import com.dinemaster.analytics.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "http://localhost:5173")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    // ─── DASHBOARD ────────────────────────────────────────────────────────────

    @GetMapping("/dashboard")
    public ResponseEntity<AnalyticsData> getDashboard() {
        return ResponseEntity.ok(analyticsService.getDashboardStats());
    }

    // ─── SALES REPORTS ────────────────────────────────────────────────────────

    @GetMapping("/sales/today")
    public ResponseEntity<SalesReport> getTodayReport() {
        return ResponseEntity.ok(analyticsService.getTodayReport());
    }

    @GetMapping("/sales/weekly")
    public ResponseEntity<List<SalesReport>> getWeekly() {
        return ResponseEntity.ok(analyticsService.getWeeklyReports());
    }

    @GetMapping("/sales/monthly")
    public ResponseEntity<List<SalesReport>> getMonthly() {
        return ResponseEntity.ok(analyticsService.getMonthlyReports());
    }

    @GetMapping("/sales/yearly")
    public ResponseEntity<List<SalesReport>> getYearly() {
        return ResponseEntity.ok(analyticsService.getYearlyReports());
    }

    // ─── FEEDBACK ─────────────────────────────────────────────────────────────

    @PostMapping("/feedback")
    public ResponseEntity<Feedback> submitFeedback(@RequestBody Feedback feedback) {
        return ResponseEntity.ok(analyticsService.submitFeedback(feedback));
    }

    @GetMapping("/feedback")
    public ResponseEntity<List<Feedback>> getAllFeedback() {
        return ResponseEntity.ok(analyticsService.getAllFeedback());
    }

    @GetMapping("/feedback/sentiment/{sentiment}")
    public ResponseEntity<List<Feedback>> getBySentiment(@PathVariable String sentiment) {
        return ResponseEntity.ok(analyticsService.getFeedbackBySentiment(sentiment));
    }

    @GetMapping("/feedback/summary")
    public ResponseEntity<Map<String, Object>> getFeedbackSummary() {
        return ResponseEntity.ok(analyticsService.getFeedbackSummary());
    }

    @PutMapping("/feedback/{id}/reply")
    public ResponseEntity<Feedback> replyToFeedback(@PathVariable String id, @RequestBody Map<String, String> body) {
        return ResponseEntity.ok(analyticsService.replyToFeedback(id, body.get("reply")));
    }

    @PutMapping("/feedback/{id}/flag")
    public ResponseEntity<Feedback> flagFeedback(@PathVariable String id, @RequestBody Map<String, Boolean> body) {
        return ResponseEntity.ok(analyticsService.flagFeedback(id, body.get("flagged")));
    }

    @DeleteMapping("/feedback/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable String id) {
        analyticsService.deleteFeedback(id);
        return ResponseEntity.noContent().build();
    }

    // ─── STAFF ────────────────────────────────────────────────────────────────

    @GetMapping("/staff")
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(analyticsService.getAllStaff());
    }

    @PostMapping("/staff")
    public ResponseEntity<Staff> addStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(analyticsService.addStaff(staff));
    }

    @PutMapping("/staff/{id}")
    public ResponseEntity<Staff> updateStaff(@PathVariable String id, @RequestBody Staff staff) {
        return ResponseEntity.ok(analyticsService.updateStaff(id, staff));
    }

    @DeleteMapping("/staff/{id}")
    public ResponseEntity<Void> deleteStaff(@PathVariable String id) {
        analyticsService.deleteStaff(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/staff/{id}/report-issue")
    public ResponseEntity<Staff> reportIssue(@PathVariable String id) {
        return ResponseEntity.ok(analyticsService.reportIssue(id));
    }

    // ─── SETTINGS ─────────────────────────────────────────────────────────────

    @GetMapping("/settings")
    public ResponseEntity<RestaurantSettings> getSettings() {
        return ResponseEntity.ok(analyticsService.getSettings());
    }

    @PostMapping("/settings")
    public ResponseEntity<RestaurantSettings> saveSettings(@RequestBody RestaurantSettings settings) {
        return ResponseEntity.ok(analyticsService.saveSettings(settings));
    }
}
