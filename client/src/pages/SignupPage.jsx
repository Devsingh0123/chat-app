import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(form));
    navigate("/login")
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-2xl font-semibold text-gray-800 text-center">
          Create account
        </h2>

        <p className="text-sm text-gray-500 text-center mt-1">
          Start your chat journey
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          <input
            name="name"
            onChange={handleChange}
            placeholder="Full name"
            className="w-full px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-400"
          />

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
            Create account
          </button>

        </form>

        <p className="text-xs text-center text-gray-500 mt-4">
          Already have an account? <span className="text-blue-600 cursor-pointer"><Link to="/login">Login</Link></span>
        </p>

      </div>
    </div>
  );
};

export default SignupPage;