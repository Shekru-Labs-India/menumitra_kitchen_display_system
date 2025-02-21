import axios from "axios";
import { API_URL } from "../config";

export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/common_api/user_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber, role: "chef" }),
        }
      );
      const result = await response.json();
      if (result.st === 1) {
        return { success: true, message: result.msg };
      } else {
        return { success: false, error: "Failed to send OTP" };
      }
    } catch (error) {
      console.error("OTP Send Error:", error);
      return { success: false, error: "Failed to send OTP" };
    }
  },

  // Verify OTP
  verifyOTP: async (mobile, otp, fcmToken) => {
    const generateRandomSessionId = (length) => {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let sessionId = "";
      for (let i = 0; i < length; i++) {
        sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return sessionId;
    };

    // Generate a 20-character session ID
    const deviceSessId = generateRandomSessionId(20);
  
    
      try {
        const response = await fetch(
          "https://men4u.xyz/kitchen_display_system_api/kds_verify_otp",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              mobile: mobile,

              otp,
              fcm_token: fcmToken ,
              device_sessid: deviceSessId, // Pass the generated session ID
            }),
          }
        );
        const result = await response.json();
        return result; // Return the complete result object
      } catch (error) {
        console.error("OTP Verification Error:", error);
        return { st: 0, msg: "Failed to verify OTP" };
      }
    },
  };