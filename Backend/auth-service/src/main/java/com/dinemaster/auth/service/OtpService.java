package com.dinemaster.auth.service;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

//    @Value("${twilio.account-sid}")
//    private String accountSid;
//
//    @Value("${twilio.auth-token}")
//    private String authToken;
//
//    @Value("${twilio.phone-number}")
//    private String fromNumber;

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

//    @PostConstruct
//    public void initTwilio() {
//        Twilio.init(accountSid, authToken);
//    }

//    @PostConstruct
//    public void checkEnv() {
//        System.out.println("SID = " + System.getenv("TWILIO_ACCOUNT_SID"));
//    }

    public String generateOtp(String identifier) {
        String key = normalizeIdentifier(identifier);
        String otp = String.format("%06d", new Random().nextInt(1_000_000));
        otpStorage.put(key, otp);

        // SMS sending can be enabled only for phone identifiers.
        if (false) {
            String phone = key.startsWith("+") ? key : "+" + key;
//            Message.creator(
//                    new com.twilio.type.PhoneNumber(phone),
//                    new com.twilio.type.PhoneNumber(fromNumber),
//                    "Your DineMaster OTP is: " + otp
//            ).create();
        }

        System.out.println("========== DEV MODE ==========");
        System.out.println("OTP for " + key + " is -> " + otp);
        System.out.println("==============================");
        return otp;
    }

    public boolean validateOtp(String identifier, String enteredOtp) {
        String key = normalizeIdentifier(identifier);
        if (otpStorage.containsKey(key) && otpStorage.get(key).equals(enteredOtp)) {
            otpStorage.remove(key);
            return true;
        }
        return false;
    }

    private String normalizeIdentifier(String identifier) {
        if (identifier == null) {
            return "";
        }
        String trimmed = identifier.trim();
        if (trimmed.contains("@")) {
            return trimmed.toLowerCase();
        }
        String digits = trimmed.replaceAll("\\D", "");
        if (trimmed.startsWith("+")) {
            return "+" + digits;
        }
        return digits;
    }

    private boolean isPhoneIdentifier(String key) {
        String normalized = key.replaceAll("\\D", "");
        return !key.contains("@") && normalized.length() >= 6;
    }
}
