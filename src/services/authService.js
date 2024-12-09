export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/kitchen_display_system_api/kds_login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber }),
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
  verifyOTP: async (mobileNumber, otp) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/kitchen_display_system_api/kds_verify_otp",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ mobile: mobileNumber, otp }),
        }
      );
      const result = await response.json();
      if (result.st === 1) {
        // Save data to local storage
        localStorage.setItem("restaurantId", result.restaurant_id);
        localStorage.setItem("ownerId", result.owner_id);
        localStorage.setItem("restaurantName", result.restaurant_name);
        localStorage.setItem("userData", JSON.stringify(result));
        // Navigate to /orders
        window.location.href = "/menumitra_kitchen_display_system/orders";
      }
      return result;
    } catch (error) {
      console.error("OTP Verification Error:", error);
      return { success: false, error: "Failed to verify OTP" };
    }
  },
};
