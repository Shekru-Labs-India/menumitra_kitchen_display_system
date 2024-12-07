import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginScreen from "./screens/LoginScreen";
import "./App.css";
import OrdersList from "./screens/OrdersList";

function App() {
  return (
    <BrowserRouter basename="/menumitra_kitchen_display_system">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<LoginScreen />} />
        {/* <Route path="/dashboard" element={<DashboardScreen />} /> */}
        <Route path="/orders" element={<OrdersList />} />

        {/* Redirects */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
