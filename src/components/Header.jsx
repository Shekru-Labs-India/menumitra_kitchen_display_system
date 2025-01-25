import React, { useEffect, useState, useRef, use } from "react";
import { Link, useLocation } from "react-router-dom";
import hotelLogo from "../assets/Hotel.png";
import { messaging } from '../firebase-config';
import { getToken, onMessage } from 'firebase/messaging';
import { VAPID_KEY } from '../config';
import axios from 'axios';
function Header() {
  const location = useLocation();
  const outletName = localStorage.getItem("outlet_name");
  const [loading, setLoading] = useState(false);
  const image = localStorage.getItem("image");
    const [isImageError, setIsImageError] = useState(false);
  const handleLogout = () => {
    // Clear all localStorage items
    localStorage.clear();
    // The Link component will handle the navigation to /login
  };
  // window.showToast('notification', "Notification sent successfully:");


  const handleCallWaiter = async () => {
    setLoading(true);

    const outlet_id = localStorage.getItem('outlet_id');
    const user_id = localStorage.getItem('user_id');

    console.log('Outlet ID:', outlet_id);
    console.log('User ID:', user_id);

    try {
        const response = await axios.post('https://men4u.xyz/common_api/call_waiter', {
            outlet_id: parseInt(outlet_id),
            user_id: parseInt(user_id),
        });

        if (response.data.st === 1) {
            window.showToast?.('success', 'Waiter has been called successfully');
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
  window.showToast('notification', `${notificationTitle}: ${notificationBody}`);
  
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
  <Link to="/" className="navbar-brand d-flex align-items-center">
    <img
      src={image}
      alt="Hotel Logo"
      className="me-2 rounded-circle"
      style={{ width: "40px", height: "40px" }}
      onError={() => setIsImageError(true)} 
    />
    <span className="fs-4 fw-bold">{outletName?.toUpperCase()}</span>
  </Link>
) : (
  <Link to="/" className="navbar-brand d-flex align-items-center">
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
  </Link>
)}

      

       
           

          {/* Call Waiter Button */}
          {/* <div className="d-flex justify-content-center position-absolute start-50 translate-middle-x">
            <button
              className="btn btn-outline-primary"
            onClick={handleCallWaiter}
            
            >
              <i className="bx bx-bell me-2"></i>
              Call Waiter
            </button>
          </div> */}

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
