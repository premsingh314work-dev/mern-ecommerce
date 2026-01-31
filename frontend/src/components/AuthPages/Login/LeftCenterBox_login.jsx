import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../Universal/AuthContext";
import { useState } from "react";

import StepIndicatorComp from "../StepIndicatorComp";
import FormInputs from "../FormInputs";
import SocialAuth from "../SocialAuth";

function LeftCenterBoxLogin() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const { setUser,fetchMe } = useAuth();
  const navigate = useNavigate();

  const steps = ["Email", "Password"];
  const [CurrentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [touched, setTouched] = useState({
    email: false,
    password: false,
  });

  // Individual field validation logic
  const isFieldValid = (field) => {
    switch (field) {
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case "password":
        return formData.password.length >= 6;
      default:
        return true;
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault();

    const fields = ["email", "password"];
    const currentFieldName = fields[CurrentStep];

    setTouched((t) => ({ ...t, [currentFieldName]: true }));

    if (!isFieldValid(currentFieldName)) return;

    if (CurrentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    // 🔐 final safety check
    if (!isFieldValid("email") || !isFieldValid("password")) return;

    try {
      const response = await axios.post(
        `${Backend_url}/api/auth/login`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        const user = response.data.user;

        setUser(user);
        alert("Logged-in Successfully! Redirecting...");
        await fetchMe();
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    }
  };

  return (
    <>
      <StepIndicatorComp steps={steps} currentStep={CurrentStep} />

      <form onSubmit={handleFormSubmit} className="p-4">
        <div className="min-h-25">
          {CurrentStep === 0 && (
            <FormInputs
              type="email"
              placeholder="Enter valid email"
              value={formData.email}
              touched={touched.email}
              isValid={isFieldValid("email")}
              onBlur={() =>
                setTouched((t) => ({ ...t, email: true }))
              }
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          )}

          {CurrentStep === 1 && (
            <FormInputs
              type="password"
              placeholder="Password (Min 6 chars)"
              value={formData.password}
              touched={touched.password}
              isValid={isFieldValid("password")}
              onBlur={() =>
                setTouched((t) => ({ ...t, password: true }))
              }
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          {CurrentStep > 0 && (
            <button
              type="button"
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded font-medium hover:bg-gray-300 transition"
            >
              Back
            </button>
          )}

          <button
            type="submit"
            className={`px-4 py-2 rounded font-bold transition ${
              CurrentStep === steps.length - 1
                ? "bg-green-600 text-white hover:bg-green-700 w-full ml-4"
                : "bg-amber-500 text-white hover:bg-amber-600"
            }`}
          >
            {CurrentStep === steps.length - 1 ? "Login" : "Next"}
          </button>
        </div>
      </form>

      <SocialAuth mode="login" />
    </>
  );
}

export default LeftCenterBoxLogin;
