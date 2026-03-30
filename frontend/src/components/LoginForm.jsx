import React, { useState } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const { isLoggingIn, login } = useAuthStore();
  const navigate = useNavigate();
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setform({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form);
    if (res) {
      navigate("/");
    }
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <ul className="steps p-1">
        <li className={"step step-primary"}>Basic Details</li>
      </ul>
      <div>
        <label className="text-sm block mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          required
          placeholder="johndoe@gmail.com"
          className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>

      <div>
        <label className="text-sm block mb-1">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          required
          placeholder="Enter your password"
          className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
      </div>
      <button
        type="submit"
        disabled={isLoggingIn}
        className="w-full py-2 bg-cyan-500 hover:bg-cyan-600 rounded-md font-semibold transition"
      >
        {isLoggingIn ? "Logging in.." : "Login"}
      </button>
    </form>
  );
};

export default LoginForm;
