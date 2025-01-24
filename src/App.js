import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import OrdersList from "./screens/OrdersList";
import React, { useEffect, useState } from "react";
import { messaging } from './firebase-config';
import { getToken, onMessage } from 'firebase/messaging';
import { VAPID_KEY } from './config';
import axios from 'axios';
import "./App.css";
import "./assets/toast/toast.js";
import "./assets/toast/toast.css";

function App() {
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

    const unsubscribe = onMessage(messaging, (payload) => {
      window.showToast('Received foreground message:', payload);
      new Notification(payload.notification.title, {
        body: payload.notification.body,
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
    <BrowserRouter basename="/">
      {/* <div className="notification-test" style={{ position: 'fixed', top: '10px', right: '10px', zIndex: 1000 }}>
        <button 
          onClick={sendTestNotification}
          style={{
            padding: '10px 20px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Test Notification
        </button>
      </div> */}

      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/orders" element={<OrdersList />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
