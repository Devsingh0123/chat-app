import { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/slices/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();

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
  };

  return (
    <div>
      <h2>Signup</h2>

      <form onSubmit={handleSubmit}>
        <input name="name" onChange={handleChange} placeholder="Name" />
        <input name="email" onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" onChange={handleChange} placeholder="Password" />

        <button type="submit">Signup</button>
      </form>
    </div>
  );
};

export default SignupPage;