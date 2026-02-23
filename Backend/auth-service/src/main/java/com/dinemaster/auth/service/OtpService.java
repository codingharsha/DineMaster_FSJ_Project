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

    @Value("${twilio.account-sid}")
    private String accountSid;

    @Value("${twilio.auth-token}")
    private String authToken;

    @Value("${twilio.phone-number}")
    private String fromNumber;

    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();

    @PostConstruct
    public void initTwilio() {
        Twilio.init(accountSid, authToken);
    }

    @PostConstruct
    public void checkEnv() {
        System.out.println("SID = " + System.getenv("TWILIO_ACCOUNT_SID"));
    }

    public String generateOtp(String mobile) {
        String formattedMobile = mobile.trim();
        if (!formattedMobile.startsWith("+")) {
            formattedMobile = "+" + formattedMobile;
        }
        String otp = String.format("%04d", new Random().nextInt(10000));
        otpStorage.put(formattedMobile, otp);

//        Message.creator(
//                new com.twilio.type.PhoneNumber(formattedMobile),
//                new com.twilio.type.PhoneNumber(fromNumber),
//                "Your DineMaster OTP is: " + otp
//        ).create();

        System.out.println("========== DEV MODE ==========");
        System.out.println("OTP for " + formattedMobile + " is -> " + otp);
        System.out.println("==============================");

        return otp;
    }

    public boolean validateOtp(String mobile, String enteredOtp) {
        String formattedMobile = mobile.trim();
        if (!formattedMobile.startsWith("+")) {
            formattedMobile = "+" + formattedMobile;
        }
        if (otpStorage.containsKey(formattedMobile) && otpStorage.get(formattedMobile).equals(enteredOtp)) {
            otpStorage.remove(formattedMobile);
            return true;
        }
        return false;
    }
}