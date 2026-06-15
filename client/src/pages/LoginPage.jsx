import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
    navigate("/")

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome back
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Login to continue chatting
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="email"
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            type="submit"
             className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition"
          >
            Login
          </button>

        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Don’t have an account? <span className="text-blue-600 cursor-pointer"><Link to="/signup">Sign up</Link> </span>
        </p>

      </div>
    </div>
  );
};

export default LoginPage;