import React, { useEffect, useState, useRef, use } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

const styles = `
  .circular-countdown {
    position: relative;
    width: 40px;
    height: 40px;
    margin: 0 auto;
  }

  .circular-timer {
    transform: rotate(-90deg);
    width: 100%;
    height: 100%;
  }

  .timer-text-overlay {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    font-weight: bold;
  }

  .font_size_14 {
    font-size: 14px;
  }

  .font_size_12 {
    font-size: 12px;
  }
`;

// Add styles to document head
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

function OrdersList() {
  const navigate = useNavigate();
  const [placedOrders, setPlacedOrders] = useState([]);
  const [cookingOrders, setCookingOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previousMenuItems, setPreviousMenuItems] = useState({});
  const outletId = localStorage.getItem("outlet_id");
  const userId = localStorage.getItem("user_id");
  
  useEffect(() => {
    if (!outletId) {
      navigate("/login");
      return;
    }
    fetchOrders();

    // Set up polling interval
    const intervalId = setInterval(fetchOrders, 10000);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, [navigate]);

  const fetchOrders = async () => {
    const accessToken = localStorage.getItem("access"); // Retrieve the access token
  
    if (!accessToken) {
      console.error("No access token found");
      window.location.href = "/login"; // Redirect to login page if no token
      return;
    }
  
    try {
      const response = await fetch(
        "https://menusmitra.xyz/common_api/cds_kds_order_listview",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // Include the access token in the header
          },
          body: JSON.stringify({ outlet_id: outletId }),
        }
      );
  
      if (response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/login"; // Redirect to login if 401
        return;
      }
  
      const result = await response.json();
  
      if (result.st === 1) {
        // Compare new orders with existing ones and store current menu items
        result.cooking_orders?.forEach(newOrder => {
          const existingOrder = cookingOrders.find(order => order.order_id === newOrder.order_id);
          if (existingOrder) {
            const existingMenuItems = existingOrder.menu_details.map(item => item.menu_name);
            setPreviousMenuItems(prev => ({
              ...prev,
              [newOrder.order_id]: existingMenuItems
            }));
          }
        });
  
        setPlacedOrders(result.placed_orders || []);
        setCookingOrders(result.cooking_orders || []);
        setPaidOrders(result.served_orders || []);
      } else {
        setError(result.msg || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setError("Error fetching orders");
    } finally {
      setLoading(false);
    }
  };
  
  const updateOrderStatus = async (orderId) => {
    const accessToken = localStorage.getItem("access"); // Retrieve the access token
  
    if (!accessToken) {
      console.error("No access token found");
      window.location.href = "/login"; // Redirect to login page if no token
      return;
    }
  
    try {
      const response = await fetch(
        "https://menusmitra.xyz/common_api/update_order_status",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`, // Include the access token in the header
          },
          body: JSON.stringify({
            outlet_id: outletId,
            order_id: orderId,
            order_status: "served",
            user_id: userId,
          }),
        }
      );
  
      if (response.status === 401) {
        console.error("Unauthorized access - redirecting to login");
        window.location.href = "/login"; // Redirect to login if 401
        return;
      }
  
      const result = await response.json();
  
      if (result.st === 1) {
        alert(result.msg);
        fetchOrders(); // Refresh orders after successful update
      } else {
        alert(result.msg || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Error updating order status");
    }
  };
  

  const getOrderTimeWithSeconds = (timeStr) => {
    if (!timeStr) return null;
    const now = new Date();
    const [time, period] = timeStr.split(" ");
    const [hours, minutes, seconds] = time.split(":");
    let hrs = parseInt(hours);

    // Convert to 24 hour format
    if (period === "PM" && hrs !== 12) hrs += 12;
    if (period === "AM" && hrs === 12) hrs = 0;

    const orderDate = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hrs,
      parseInt(minutes),
      parseInt(seconds)
    );

    // If order time is in future, it must be from previous day
    if (orderDate > now) {
      orderDate.setDate(orderDate.getDate() - 1);
    }

    return orderDate;
  };



  const CircularCountdown = ({ orderId, order }) => {
    const [timeLeft, setTimeLeft] = useState(90);
    const [isExpired, setIsExpired] = useState(false);
    const timerRef = useRef(null);
  
    const parseOrderDate = (dateTimeStr) => {
      // Format: "31-Jan-2025 06:21:17 PM"
      const [datePart, timePart, modifier] = dateTimeStr.split(' ');
      const [day, month, year] = datePart.split('-');
      const [hours, minutes, seconds] = timePart.split(':');
  
      const months = {
        Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
        Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
      };
  
      const parsedDate = new Date(
        year, 
        months[month], 
        parseInt(day, 10),
        modifier === 'PM' ? parseInt(hours, 10) + 12 : parseInt(hours, 10), 
        parseInt(minutes, 10), 
        parseInt(seconds, 10)
      );
  
      return parsedDate;
    };
  
    const handleRejectOrder = async () => {
      const accessToken = localStorage.getItem("access");
      if (!accessToken) {
        console.error("No access token found");
        window.location.href = "/login";
        return;
      }
  
      try {
        const response = await fetch(
          "https://menusmitra.xyz/common_api/update_order_status",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify({
              outlet_id: localStorage.getItem("outlet_id"),
              order_id: orderId,
              order_status: "cancelled",
              user_id: localStorage.getItem("user_id"),
            }),
          }
        );
  
        if (response.status === 401) {
          console.error("Unauthorized access - redirecting to login");
          window.location.href = "/login";
          return;
        }
  
        const result = await response.json();
        if (result.st === 1) {
          alert(result.msg);
          fetchOrders();
        } else {
          alert(result.msg || "Failed to cancel order");
        }
      } catch (error) {
        console.error("Error cancelling order:", error);
        alert("Error cancelling order");
      }
    };
  
    useEffect(() => {
      const orderDate = parseOrderDate(order?.date_time);
      if (!orderDate) {
        setIsExpired(true);
        return;
      }
  
      const expiryTime = new Date(orderDate.getTime() + (90 * 1000));
  
      const calculateTimeLeft = () => {
        const now = new Date().getTime();
        const remaining = Math.max(Math.floor((expiryTime - now) / 1000), 0);
  
        if (remaining === 0) {
          setIsExpired(true);
          clearInterval(timerRef.current);
          return;
        }
        setTimeLeft(remaining);
      };
  
      calculateTimeLeft();
      timerRef.current = setInterval(calculateTimeLeft, 1000);
  
      return () => {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      };
    }, [orderId, order?.date_time]);
  
    if (isExpired) return null;
  
    const percentage = (timeLeft / 90) * 100;
  
    return (
      <div className="d-flex align-items-center gap-2">
        <div className="circular-countdown">
          <svg viewBox="0 0 36 36" className="circular-timer">
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#eee"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                 a 15.9155 15.9155 0 0 1 0 31.831
                 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#2196f3"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="timer-text-overlay text-dark">{timeLeft}s</div>
        </div>
        <button className="btn btn-danger btn-sm" onClick={handleRejectOrder}>
          Reject
        </button>
      </div>
    );
  };
  

  const renderOrders = (orders, type) => {
    if (!Array.isArray(orders)) return null;

    return orders.map((order) => {
      const prevMenuItems = previousMenuItems[order.order_id] || [];

      return (
        <div className="col-12" key={order.order_id}>
          <div className="card bg-white rounded-3">
            <div className={`card-header bg-${type} bg-opacity-10 py-2`}>
              <div className="d-flex justify-content-between align-items-center">
                <p className="fs-3 fw-bold mb-0">
                  <i className="bx bx-hash"></i> {order.order_number}
                </p>
                <p className="mb-0 fs-5 text-capitalize fw-semibold">
                  {order.section_name
                    ? `${order.section_name} - ${order.table_number}`
                    : order.order_type}
                </p>
              </div>
            </div>
            <div className="card-body p-3">
              {Array.isArray(order.menu_details) && order.menu_details.map((menu, index) => {
                const isNewItem = prevMenuItems.length > 0 && !prevMenuItems.includes(menu.menu_name);
                return (
                  <div
                    className={`d-flex justify-content-between align-items-center border-start border-${type} border-3 ps-2 mb-2`}
                    key={index}
                  >
                    <div className={`fw-semibold text-capitalize ${isNewItem ? 'text-danger' : ''}`}>
                      {menu.menu_name}
                    </div>
                    <div className={`fw-semibold text-capitalize ${isNewItem ? 'text-danger' : ''}`}>
                      {menu.half_or_full}
                    </div>
                    <div className="d-flex align-items-center text-end gap-2">
                      <span>× {menu.quantity}</span>
                      {type === 'secondary' && index === 0 && (
                        <span className="text-muted">{order.timeLeft}</span>
                      )}
                    </div>
                  </div>
                );
              })}
              {type === 'warning' && (
                <button
                  className="btn btn-success w-100 mt-3"
                  onClick={() => updateOrderStatus(order.order_id)}
                >
                  Complete Order
                </button>
              )}
              {type === 'secondary' && (
                <div className="d-flex justify-content-end mt-2">
                  <CircularCountdown orderId={order.order_id} order={order} />
                </div>
              )}
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-vh-100 d-flex flex-column bg-light">
      <Header />

      <div className="flex-grow-1 p-3">
        {loading && <div className="text-center mt-5">Loading orders...</div>}
        {error && (
          <div className="alert alert-danger text-center mt-5">{error}</div>
        )}

        {!loading && !error && (
          <div className="row g-3">
            {/* Placed Orders */}
            <div className="col-4">
              <h4 className="display-5 text-white text-center fw-bold mb-3 mb-md-4 bg-secondary py-2 d-flex align-items-center justify-content-center rounded-4">
                Placed
              </h4>
              <div className="row g-3">
                {renderOrders(placedOrders, 'secondary')}
              </div>
            </div>

            {/* Cooking Orders (previously Ongoing) */}
            <div className="col-4">
              <h4 className="display-5 text-white text-center fw-bold mb-3 mb-md-4 bg-warning py-2 d-flex align-items-center justify-content-center rounded-4">
                Cooking
              </h4>
              <div className="row g-3">
                {renderOrders(cookingOrders, 'warning')}
              </div>
            </div>

            {/* Paid Orders (previously Completed) */}
            <div className="col-4">
              <h4 className="display-5 text-white text-center fw-bold mb-3 mb-md-4 bg-success py-2 d-flex align-items-center justify-content-center rounded-4">
                Served
              </h4>
              <div className="row g-3">
                {renderOrders(paidOrders, 'success')}
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

export default OrdersList;
