import React, { useEffect, useState, useRef, use } from "react";
import { Link, useLocation } from "react-router-dom";
import hotelLogo from "../assets/Hotel.png";
import { messaging } from '../firebase-config';
import { getToken, onMessage } from 'firebase/messaging';
import { VAPID_KEY, BASE_API_URL } from '../config';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
function Header() {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const image = localStorage.getItem("image");
    const [isImageError, setIsImageError] = useState(false);
    const authData = JSON.parse(localStorage.getItem("authData"));
    // const outletName = authData?.outlet_name; // Get 
    // const userId = authData?.user_id; // Get 
    const outletName = localStorage.getItem("outlet_name");
const userId = localStorage.getItem("user_id");
    const navigate = useNavigate();
    const handleLogout = async () => {
      try {
  
      
    
        const logoutData = {
          user_id: userId,
          role: "chef",
          app: "chef", // Assuming 'owner' is the application name
          device_token: localStorage.getItem("device_token"),
        };
    
        // Make API request to logout using fetch
        const response = await fetch(`${BASE_API_URL}/common_api/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(logoutData), // Send logout data as JSON in the body
        });
    
        const data = await response.json(); // Parse JSON response
    
        if (data.st === 1) {
          // Successfully logged out, clear all localStorage items
          localStorage.clear();
          // Redirect to login page
         navigate("/login")
        } else {
          localStorage.clear();
        }
      } catch (error) {
        console.error("Error logging out:", error);
        window.showToast("error", error.message || "Failed to log out.");
      }
    };
  // window.showToast('notification', "Notification sent successfully:");

  // window.showToast('notification', "gjkddghdghdfghdhdhgdh",100000);

  const handleCallWaiter = async () => {
    setLoading(true);

    const outlet_id = localStorage.getItem('outlet_id');
    const user_id = localStorage.getItem('user_id');

    console.log('Outlet ID:', outlet_id);
    console.log('User ID:', user_id);
    const accessToken = localStorage.getItem("access"); // Retrieve the access token
  
    if (!accessToken) {
      console.error("No access token found");
      window.location.href = "/login"; // Redirect to login page if no token
      return;
    }
    try {
        const response = await axios.post(`${BASE_API_URL}/common_api/call_waiter`, {
          outlet_id: parseInt(outlet_id),
          user_id: parseInt(user_id),
          device_token: localStorage.getItem("device_token"),
      }, {
          headers: {
              Authorization: `Bearer ${accessToken}`,
          },
      });
        if (response.data.st === 1) {
            window.showToast?.('success', 'Waiter has been called ');
        } else {
            window.showToast?.('error', response.data.msg || 'Failed to call the waiter');
        }
    } catch (error) {
        console.error('Error Object:', error); // Logs the complete error object
        window.showToast?.(
            'error',
            error.response?.data?.msg || error.message || 'Something went wrong. Please try again later.'
        );
    } finally {
        setLoading(false);
    }
};


// window.showToast('notification', "FCM token not found!");

const [fcmToken, setFcmToken] = useState(null);
const BEARER_TOKEN = "ya29.a0AXeO80SFq8nJtSIvzwC2kSl5hxOnp8WNrXxLikOi-fYSCf27pzfQ4_GBxT-xzVeoIIsVnQmdTiNpxWa-mAFsO3YaDap0yfuENzM2SRe02crTSfkQV5ga9HTxEuU5zRznzxbX2KAFlrEmSPSQDON8MlvV5mLQYCHofvAJEghpaCgYKAbYSARESFQHGX2MiQo_N-7s-Tq58N9jy6mnCRw0175";
useEffect(() => {
  const setupFCM = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY
        });
        setFcmToken(token);
        localStorage.setItem("fcmToken", token);
        console.log("FCM Token:", token);
      }
    } catch (error) {
      console.error("Error setting up FCM:", error);
    }
  };

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/firebase-messaging-sw.js')
      .then(function(registration) {
        console.log('Service Worker registered successfully');
        setupFCM();
      })
      .catch(function(err) {
        console.error('Service Worker registration failed:', err);
      });
  }

//   const unsubscribe = onMessage(messaging, (payload) => {
//     window.showToast('Received foreground message:', payload);
//     new Notification(payload.notification.title, {
//       body: payload.notification.body,
//     });
//   });

//   return () => unsubscribe();
// }, []);




const unsubscribe = onMessage(messaging, (payload) => {
  // Format the notification message for the toast
  const notificationTitle = payload.notification.title;
  const notificationBody = payload.notification.body;
  window.showToast('notification', `${notificationTitle}: ${notificationBody}`,10000);
  
  // Still show the native notification
  new Notification(notificationTitle, {
    body: notificationBody,
  });
});

return () => unsubscribe();
}, []);

const sendTestNotification = async () => {
  const token = localStorage.getItem("fcmToken");
  if (!token) {
    alert("FCM token not found!");
    return;
  }

  try {
    const response = await axios.post(
      'https://fcm.googleapis.com/v1/projects/menumitra-83831/messages:send',
      {
        message: {
          token: token,
          notification: {
            title: "Test Notification",
            body: "This is a test notification from MenuMitra"
          }
        }
      },
      {
        headers: {
          'Authorization': `Bearer ${BEARER_TOKEN}`,
          'Content-Type': 'application/json',
        }
      }
    );

    window.showToast('Notification sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending notification:', error?.response?.data || error.message);
    window.showToast('Error sending notification: ' + (error?.response?.data?.error?.message || error.message));
  }
};


  return (
    <header className="bg-white shadow-sm">
      <nav className="navbar navbar-light py-2">
        <div className="container-fluid px-5">
          {/* Brand/Logo */}
          {!isImageError && image ? (
  <div className="navbar-brand d-flex align-items-center">
    <img
      src={image}
      alt="Hotel Logo"
      className="me-2 rounded-circle"
      style={{ width: "40px", height: "40px" }}
      onError={() => setIsImageError(true)} 
    />
    <span className="fs-4 fw-bold">{outletName?.toUpperCase()}</span>
  </div>
) : (
  <div  className="navbar-brand d-flex align-items-center">
    <div
      className="me-2 d-flex justify-content-center align-items-center rounded-circle"
      style={{
        width: "40px",
        height: "40px",
        backgroundColor: "#ddd",
        fontSize: "18px",
        fontWeight: "bold",
      }}
    >
      {outletName?.[0]?.toUpperCase() || "H"}
    </div>
    <span className="fs-4 fw-bold">{outletName?.toUpperCase() || "HOTEL"}</span>
  </div>
)}

      

       
           

          {/* Call Waiter Button */}
           <div className="d-flex justify-content-center position-absolute start-50 translate-middle-x">
            <button
              className="btn btn-outline-primary"
            onClick={handleCallWaiter}
            
            >
              <i className="bx bx-bell me-2"></i>
              Call Waiter
            </button>
          </div> 

          {/* Logout Button - Always Visible */}
          <div className="d-flex align-items-center">
            <Link 
              to="/login" 
              className="btn btn-outline-danger"
              onClick={handleLogout}
            >
              <i className="bx bx-log-out"></i>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
