// Development mode flag - change this to false for production
const isDevelopment = true;

// Development credentials
const DEV_MOBILE = '1111111111';
const DEV_OTP = '1234';

export const authService = {
  // Send OTP
  sendOTP: async (mobileNumber) => {
    if (isDevelopment) {
      // Development mode - mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ success: mobileNumber === DEV_MOBILE });
        }, 1000);
      });
    } else {
      // Production mode - real API call
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/send-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNumber })
        });
        return await response.json();
      } catch (error) {
        console.error('OTP Send Error:', error);
        return { success: false, error: 'Failed to send OTP' };
      }
    }
  },

  // Verify OTP
  verifyOTP: async (mobileNumber, otp) => {
    if (isDevelopment) {
      // Development mode - mock API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({ 
            success: mobileNumber === DEV_MOBILE && otp === DEV_OTP,
            token: 'mock-jwt-token'
          });
        }, 1000);
      });
    } else {
      // Production mode - real API call
      try {
        // Replace with your actual API endpoint
        const response = await fetch('/api/verify-otp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mobileNumber, otp })
        });
        return await response.json();
      } catch (error) {
        console.error('OTP Verification Error:', error);
        return { success: false, error: 'Failed to verify OTP' };
      }
    }
  }
}; 