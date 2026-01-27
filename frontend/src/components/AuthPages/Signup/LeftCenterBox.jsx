import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import StepIndicatorComp from "../StepIndicatorComp";
import FormInputs from "../FormInputs";
import { ChevronLeft, ChevronRight } from "lucide-react";
import  ProfileImageData from "../../../data/ProfileImage.data" ;

function LeftCenterBox() {
  const steps = ["Name", "Email", "Phone", "Password", "Profile"];
  const [CurrentStep, setCurrentStep] = useState(4);

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % ProfileImageData.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + ProfileImageData.length) % ProfileImageData.length);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    profileImageURL:"",
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  const handleNext = () => {
    if (CurrentStep === 0) {
      console.log(formData.name);

      setTouched((t) => ({ ...t, name: true }));
      if (!formData.name.trim()) return;
    }

    if (CurrentStep === 1) {
      console.log(formData.email);
      setTouched((t) => ({ ...t, email: true }));
      if (!formData.email.trim()) return;
    }

    if (CurrentStep === 2) {
      console.log(formData.phone);
      setTouched((t) => ({ ...t, phone: true }));
      if (!formData.phone.trim()) return;
    }

    if (CurrentStep === 3) {
      console.log(formData.password);
      setTouched((t) => ({ ...t, password: true }));
      if (!formData.password.trim()) return;
    }
    console.log(formData);

    setCurrentStep((prev) => prev + 1);
  };
  const handleEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // very important
      handleNext();
    }
  };

  return (
    <div className=" bg-[#F7F7F7]  w-[60%] flex flex-col border-r p-2">
      {/* Step indicator */}
      <StepIndicatorComp steps={steps} currentStep={CurrentStep} />

      <div className="flex items-center gap-2">
        <div className="flex h-px bg-gray-300" />
        <span className="text-sm text-gray-500"></span>
        <div className="flex-1 h-px bg-gray-300" />
      </div>
      {/* FORM AREA */}
      <div className="p-4">
        {/* form fields will go here */}
        <>
          {CurrentStep === 0 && (
            <FormInputs
              key={CurrentStep}
              type="text"
              placeholder="Enter your name"
              value={formData.name}
              touched={touched.name}
              onBlur={() => setTouched({ ...touched, name: true })}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}

          {CurrentStep === 1 && (
            <FormInputs
              key={CurrentStep}
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              touched={touched.email}
              onBlur={() => setTouched({ ...touched, email: true })}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          )}

          {CurrentStep === 2 && (
            <FormInputs
              key={CurrentStep}
              type="tel"
              placeholder="Enter your Number"
              value={formData.phone}
              touched={touched.phone}
              onBlur={() => setTouched({ ...touched, phone: true })}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          )}

          {CurrentStep === 3 && (
            <FormInputs
              key={CurrentStep}
              type="password"
              placeholder="Enter your Password"
              value={formData.password}
              touched={touched.password}
              onBlur={() => setTouched({ ...touched, password: true })}
              onKeyDown={handleEnter}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}
         {CurrentStep === 4 && (
            <div className="flex flex-col items-center gap-4">
              {/* Title */}
              <h2 className="text-lg font-semibold">Profile Image</h2>

              {/* Image Selector */}
              <div className="flex items-center gap-4">
                {/* Left Arrow */}
                <button
                  type="button"
                  onClick={prevImage}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <ChevronLeft />
                </button>

                {/* Circular Image */}
                <div className="h-40 w-40 rounded-full overflow-hidden border-2 border-amber-500">
                  <img
                    src={ProfileImageData[currentIndex]}
                    alt="Profile"
                    className="h-40 w-40 object-cover text-center"
                  />
                </div>

                {/* Right Arrow */}
                <button
                  type="button"
                  onClick={nextImage}
                  className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
                >
                  <ChevronRight />
                </button>
              </div>

              {/* Optional indicator */}
              <p className="text-sm text-gray-500">
                {currentIndex + 1} / {ProfileImageData.length}
              </p>
            </div>
          )}
        </>

        <div className="flex justify-between mt-6">
          {CurrentStep > 0 && (
            <button
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Back
            </button>
          )}

          {CurrentStep < steps.length - 1 && (
            <button
              onClick={() => handleNext()}
              className="px-4 py-2 bg-amber-500 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>

      {/* Extra actions */}
      <div className="mt-6 flex flex-col gap-4">
        {/* Divider */}
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Signup */}
        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
        >
          {/* Google icon */}
          <svg className="h-5 w-5" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.02 1.54 7.4 2.83l5.4-5.4C33.64 3.84 29.26 2 24 2 14.9 2 7.25 7.42 4.46 14.78l6.69 5.19C12.9 14.13 17.99 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24c0-1.57-.14-3.08-.4-4.5H24v9h12.7c-.55 2.98-2.22 5.5-4.7 7.18l7.24 5.63C43.44 37.13 46.5 31.07 46.5 24z"
            />
            <path
              fill="#FBBC05"
              d="M11.15 28.97A14.5 14.5 0 0 1 10.4 24c0-1.72.3-3.38.75-4.97l-6.69-5.19A23.98 23.98 0 0 0 2 24c0 3.93.95 7.64 2.46 10.97l6.69-5.19z"
            />
            <path
              fill="#34A853"
              d="M24 46c6.48 0 11.92-2.14 15.9-5.79l-7.24-5.63c-2.02 1.36-4.6 2.17-8.66 2.17-6.01 0-11.1-4.63-12.85-10.78l-6.69 5.19C7.25 40.58 14.9 46 24 46z"
            />
          </svg>

          <span className="text-sm font-medium">Continue with Google</span>
        </button>

        {/* Login link */}
        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-amber-600 font-semibold cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LeftCenterBox;
