import axios from "axios";
import { API_URL, BASE_API_URL } from "../config";

export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        `${BASE_API_URL}/common_api/user_login`,
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
        `${BASE_API_URL}/kitchen_display_system_api/kds_verify_otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            mobile: mobile,
            otp,
            fcm_token: "e5Cq1shUT8-DY6y:APA91bFeFAKE-TOKEN-0000000000000000000000000001",
            device_sessid: deviceSessId,
            device_id: "3ea1200c85a512872e0a240e2bb3651215245bf9fb9e127454a377f677dcfec5",
            device_model: "3ea1200c85a512872e0a240e2bb3651215245bf9fb9e127454a377f677dcfec5"
          }),
        }
      );
      const result = await response.json();
      
      // If login successful, store necessary data in localStorage
      if (result.st === 1) {
        // Store authentication tokens
        localStorage.setItem("access", result.access);
        localStorage.setItem("refresh", result.refresh);
        localStorage.setItem("device_token", result.device_token);
        
        // Store user and outlet information
        localStorage.setItem("user_id", result.user_id);
        localStorage.setItem("outlet_id", result.outlet_id);
        localStorage.setItem("outlet_name", result.outlet_name);
        localStorage.setItem("image", result.image);
        
        // Store complete auth data for reference
        localStorage.setItem("authData", JSON.stringify({
          user_id: result.user_id,
          outlet_id: result.outlet_id,
          outlet_name: result.outlet_name,
          image: result.image,
          settings: result.settings
        }));
        
        // Store settings separately for easy access
        localStorage.setItem("settings", JSON.stringify(result.settings));
      }
      
      return result; // Return the complete result object
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return { st: 0, msg: "Failed to verify OTP" };
    }
  },
  };