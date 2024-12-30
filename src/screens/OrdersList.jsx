import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";

function OrdersList() {
  const navigate = useNavigate();
  const [placedOrders, setPlacedOrders] = useState([]);
  const [cookingOrders, setCookingOrders] = useState([]);
  const [paidOrders, setPaidOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const restaurantId = localStorage.getItem("restaurantId");

  useEffect(() => {
    if (!restaurantId) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [navigate]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(
        "https://men4u.xyz/kitchen_display_system_api/kds_order_listview",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ restaurant_id: restaurantId }),
        }
      );

      const result = await response.json();
      console.log("API Response:", result); // Debug log

      if (result.st === 1) {
        setPlacedOrders(result.placed_orders || []);
        setCookingOrders(result.cooking_orders || []);
        setPaidOrders(result.paid_orders || []);
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

  // useEffect(() => {
  //   fetchOrders();
  // }, [1000]);

  setInterval(fetchOrders, 10000);

  const updateOrderStatus = async (orderId) => {
    try {
      const response = await fetch(
        "https://men4u.xyz/kitchen_display_system_api/kds_update/order_status",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            restaurant_id: restaurantId,
            order_id: orderId,
          }),
        }
      );

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

  // Add null checks before mapping
  const renderOrders = (orders, type) => {
    if (!Array.isArray(orders)) return null;
    
    return orders.map((order) => (
      <div className="col-12" key={order.order_id}>
        <div className="card bg-white rounded-3">
          <div className={`card-header bg-${type} bg-opacity-10 py-2`}>
            <div className="d-flex justify-content-between align-items-center">
              <p className="fs-3 fw-bold mb-0">
                <i className="bx bx-hash"></i> {order.order_number}
              </p>
              <p className="mb-0 fs-5 fw-semibold">
                {order.section_name
                  ? `${order.section_name} - ${order.table_number}`
                  : order.order_type}
              </p>
            </div>
          </div>
          <div className="card-body p-3">
            {Array.isArray(order.menu_details) && order.menu_details.map((menu, index) => (
              <div
                className={`d-flex justify-content-between align-items-center border-start border-${type} border-3 ps-2 mb-2`}
                key={index}
              >
                <div className="fw-semibold">{menu.menu_name}</div>
                <span>× {menu.quantity}</span>
              </div>
            ))}
            {type === 'warning' && (
              <button
                className="btn btn-success w-100 mt-3"
                onClick={() => updateOrderStatus(order.order_id)}
              >
                Complete Order
              </button>
            )}
          </div>
        </div>
      </div>
    ));
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
                Paid
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
