import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ChatPage from "../pages/ChatPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* MAIN APP ROUTE */}
        <Route path="/" element={<ProtectedRoute><ChatPage /></ProtectedRoute>} />

        {/* AUTH ROUTES */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />


      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;