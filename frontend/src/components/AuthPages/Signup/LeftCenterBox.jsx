import { Link } from "react-router-dom";
import axios from "axios";
import ProfileImageData from "../../../data/ProfileImage.data";
import { useAuth } from "../../Universal/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StepIndicatorComp from "../StepIndicatorComp";
import FormInputs from "../FormInputs";
import ProfileImageSelector from "./ProfileImageSelector";
import SocialAuth from "../SocialAuth";

function LeftCenterBox() {
  const Backend_url = import.meta.env.VITE_BACKEND_URL;
  const { setUser,fetchMe} = useAuth();
  const navigate = useNavigate();

  const steps = ["Name", "Email", "Phone", "Password", "avatar"];
  const [CurrentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    avatar: ProfileImageData[0],
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
  });

  // Individual field validation logic
  const isFieldValid = (field) => {
    switch (field) {
      case "name":
        return formData.name.trim().length >= 3;
      case "email":
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
      case "phone":
        return /^\d{10}$/.test(formData.phone);
      case "password":
        return formData.password.length >= 6;
      default:
        return true;
    }
  };

  const handleFormSubmit = (e) => {
    if (e) e.preventDefault(); // Prevents page reload on "Enter"

    const fields = ["name", "email", "phone", "password", "avatar"];
    const currentFieldName = fields[CurrentStep];

    // Mark current field as touched so error/success colors show
    setTouched((t) => ({ ...t, [currentFieldName]: true }));

    // Stop if the current input is invalid
    if (CurrentStep < 4 && !isFieldValid(currentFieldName)) return;

    if (CurrentStep < steps.length - 1) {
      // Go to next step
      setCurrentStep((prev) => prev + 1);
    } else {
      // Final step: Create Account
      handleCreateAccount();
    }
  };

  const handleCreateAccount = async () => {
    try {
      const response = await axios.post(
        `${Backend_url}/api/auth/signup`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.status === 201) {
        console.log("Backend Response:", response.data);

        alert("Account Created Successfully! Redirecting...");
        // Redirect user to login or dashboard
        if (response.status === 201) {
          const user = response.data.user;

          // 🔥 tell AuthContext that user is logged in
          setUser(user);
          await fetchMe();
          // navigate without reload
          navigate("/");
        }
      }
    } catch (error) {
      // Handle Errors (Validation errors, server down, etc.)
      console.error("Signup Error:", error.response?.data || error.message);
      alert(
        error.response?.data?.message ||
          "Something went wrong. Please try again.",
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
              type="text"
              placeholder="Enter your name (Min 3 chars)"
              value={formData.name}
              touched={touched.name}
              isValid={isFieldValid("name")}
              onBlur={() => setTouched({ ...touched, name: true })}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          )}

          {CurrentStep === 1 && (
            <FormInputs
              type="email"
              placeholder="Enter valid email"
              value={formData.email}
              touched={touched.email}
              isValid={isFieldValid("email")}
              onBlur={() => setTouched({ ...touched, email: true })}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          )}

          {CurrentStep === 2 && (
            <FormInputs
              type="tel"
              placeholder="Enter 10-digit number"
              value={formData.phone}
              touched={touched.phone}
              isValid={isFieldValid("phone")}
              onBlur={() => setTouched({ ...touched, phone: true })}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
          )}

          {CurrentStep === 3 && (
            <FormInputs
              type="password"
              placeholder="Password (Min 6 chars)"
              value={formData.password}
              touched={touched.password}
              isValid={isFieldValid("password")}
              onBlur={() => setTouched({ ...touched, password: true })}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          )}

          {CurrentStep === 4 && (
            <ProfileImageSelector
              ProfileImageData={ProfileImageData}
              selectedImage={formData.avatar}
              onImageChange={(img) => setFormData({ ...formData, avatar: img })}
            />
          )}
        </div>

        <div className="flex justify-between mt-6">
          {/* Back and Next/Create buttons remain same */}
          {CurrentStep > 0 && (
            <button
              type="button" // Type "button" prevents this from triggering the "Enter" submit
              onClick={() => setCurrentStep((prev) => prev - 1)}
              className="px-4 py-2 bg-gray-200 rounded font-medium hover:bg-gray-300 transition"
            >
              Back
            </button>
          )}

          <button
            type="submit" // Type "submit" allows the Enter key to trigger handleFormSubmit
            className={`px-4 py-2 rounded font-bold transition ${
              CurrentStep === steps.length - 1
                ? "bg-green-600 text-white hover:bg-green-700 w-full ml-4"
                : "bg-amber-500 text-white hover:bg-amber-600"
            }`}
          >
            {CurrentStep === steps.length - 1 ? "Create Account" : "Next"}
          </button>
        </div>
      </form>

      <SocialAuth mode="signup" />
    </>

    // <div className="bg-[#F7F7F7] w-[60%] flex flex-col border-r p-2">
    //   <StepIndicatorComp steps={steps} currentStep={CurrentStep} />

    //   {/* Wrapping in form enables the "Enter" key functionality */}
    //   <form onSubmit={handleFormSubmit} className="p-4">
    // <div className="min-h-25">
    //   {CurrentStep === 0 && (
    //     <FormInputs
    //       type="text"
    //       placeholder="Enter your name (Min 3 chars)"
    //       value={formData.name}
    //       touched={touched.name}
    //       isValid={isFieldValid("name")}
    //       onBlur={() => setTouched({ ...touched, name: true })}
    //       onChange={(e) =>
    //         setFormData({ ...formData, name: e.target.value })
    //       }
    //     />
    //   )}

    //   {CurrentStep === 1 && (
    //     <FormInputs
    //       type="email"
    //       placeholder="Enter valid email"
    //       value={formData.email}
    //       touched={touched.email}
    //       isValid={isFieldValid("email")}
    //       onBlur={() => setTouched({ ...touched, email: true })}
    //       onChange={(e) =>
    //         setFormData({ ...formData, email: e.target.value })
    //       }
    //     />
    //   )}

    //   {CurrentStep === 2 && (
    //     <FormInputs
    //       type="tel"
    //       placeholder="Enter 10-digit number"
    //       value={formData.phone}
    //       touched={touched.phone}
    //       isValid={isFieldValid("phone")}
    //       onBlur={() => setTouched({ ...touched, phone: true })}
    //       onChange={(e) =>
    //         setFormData({ ...formData, phone: e.target.value })
    //       }
    //     />
    //   )}

    //   {CurrentStep === 3 && (
    //     <FormInputs
    //       type="password"
    //       placeholder="Password (Min 6 chars)"
    //       value={formData.password}
    //       touched={touched.password}
    //       isValid={isFieldValid("password")}
    //       onBlur={() => setTouched({ ...touched, password: true })}
    //       onChange={(e) =>
    //         setFormData({ ...formData, password: e.target.value })
    //       }
    //     />
    //   )}

    //   {CurrentStep === 4 && (
    //     <ProfileImageSelector
    //       ProfileImageData={ProfileImageData}
    //       selectedImage={formData.avatar}
    //       onImageChange={(img) => setFormData({ ...formData, avatar: img })}
    //     />
    //   )}
    // </div>

    //     <div className="flex justify-between mt-6">
    // {CurrentStep > 0 && (
    //   <button
    //     type="button" // Type "button" prevents this from triggering the "Enter" submit
    //     onClick={() => setCurrentStep((prev) => prev - 1)}
    //     className="px-4 py-2 bg-gray-200 rounded font-medium hover:bg-gray-300 transition"
    //   >
    //     Back
    //   </button>
    // )}

    // <button
    //   type="submit" // Type "submit" allows the Enter key to trigger handleFormSubmit
    //   className={`px-4 py-2 rounded font-bold transition ${
    //     CurrentStep === steps.length - 1
    //       ? "bg-green-600 text-white hover:bg-green-700 w-full ml-4"
    //       : "bg-amber-500 text-white hover:bg-amber-600"
    //   }`}
    // >
    //   {CurrentStep === steps.length - 1 ? "Create Account" : "Next"}
    // </button>
    //     </div>
    //   </form>

    //   {/* Google/Login Ui */}
      // <>
      //   <div className="mt-6 flex flex-col gap-4">
      //     <div className="flex items-center gap-2">
      //       <div className="flex-1 h-px bg-gray-300" />
      //       <span className="text-sm text-gray-500">OR</span>
      //       <div className="flex-1 h-px bg-gray-300" />
      //     </div>

      //     <button
      //       type="button"
      //       className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
      //     >
      //       <svg className="h-5 w-5" viewBox="0 0 48 48">
      //         <path
      //           fill="#EA4335"
      //           d="M24 9.5c3.54 0 6.02 1.54 7.4 2.83l5.4-5.4C33.64 3.84 29.26 2 24 2 14.9 2 7.25 7.42 4.46 14.78l6.69 5.19C12.9 14.13 17.99 9.5 24 9.5z"
      //         />
      //         <path
      //           fill="#4285F4"
      //           d="M46.5 24c0-1.57-.14-3.08-.4-4.5H24v9h12.7c-.55 2.98-2.22 5.5-4.7 7.18l7.24 5.63C43.44 37.13 46.5 31.07 46.5 24z"
      //         />
      //         <path
      //           fill="#FBBC05"
      //           d="M11.15 28.97A14.5 14.5 0 0 1 10.4 24c0-1.72.3-3.38.75-4.97l-6.69-5.19A23.98 23.98 0 0 0 2 24c0 3.93.95 7.64 2.46 10.97l6.69-5.19z"
      //         />
      //         <path
      //           fill="#34A853"
      //           d="M24 46c6.48 0 11.92-2.14 15.9-5.79l-7.24-5.63c-2.02 1.36-4.6 2.17-8.66 2.17-6.01 0-11.1-4.63-12.85-10.78l-6.69 5.19C7.25 40.58 14.9 46 24 46z"
      //         />
      //       </svg>
      //       <span className="text-sm font-medium">Continue with Google</span>
      //     </button>

      //     <p className="text-center text-sm text-gray-600">
      //       Already have an account?{" "}
      //       <Link
      //         to="/login"
      //         className="text-amber-600 font-semibold hover:underline"
      //       >
      //         Login
      //       </Link>
      //     </p>
      //   </div>
      // </>
    // </div>
  );
}

export default LeftCenterBox;
