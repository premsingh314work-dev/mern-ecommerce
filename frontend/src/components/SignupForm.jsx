import React, { useState,useEffect } from "react";
import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SignupForm = () => {
  const { isSigningUp, signup } = useAuthStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [atSecondStage, setAtSecondStage] = useState(false);
  const avatars = [
    "/PFP_1.png",
    "/PFP_2.png",
    "/PFP_3.png",
    "/PFP_4.png",
    "/PFP_5.png",
    "/PFP_6.png",
  ];
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    avatar: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const handleNext = () => {
    const { name, email, password, phone } = form;

    if (!name || !email || !password || !phone) {
      alert("Please fill all fields");
      return;
    }

    setAtSecondStage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!atSecondStage) return;
    if (!form.avatar) {
      alert("Please select an avatar");
      return;
    }
    console.log(form);

    const res = await signup(form);
    if (res) {
      navigate("/");
    }
  };
  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      avatar: avatars[0],
    }));
  }, []);

  return (
    <>
      {!atSecondStage ? (
        <>
          <form className="flex flex-col gap-3">
            <ul className="steps">
              <li className={"step step-primary"}>Basic Details</li>
              <li className={`step ${atSecondStage ? "step-primary" : ""}`}>
                Avatar
              </li>
            </ul>
            <div className="flex flex-col gap-3">
              <div>
                <label className="text-sm block mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-md bg-slate-800 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>
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
                <label className="text-sm block mb-1">Phone No.</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  placeholder="Enter your Phone No."
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
            </div>
            <button
              type="button"
              className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-md transition-colors"
              onClick={handleNext}
            >
              {" "}
              Next
            </button>
          </form>
        </>
      ) : (
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <ul className="steps">
            <li className={"step step-primary"}>Basic Details</li>
            <li className={`step ${atSecondStage ? "step-primary" : ""}`}>
              Avatar
            </li>
          </ul>
          <div className="flex items-center justify-center gap-4">
            {/* LEFT BUTTON */}
            <button
              type="button"
              onClick={() => {
                const newIndex =
                  (currentIndex - 1 + avatars.length) % avatars.length;

                setCurrentIndex(newIndex);

                // ✅ auto select avatar
                setForm({
                  ...form,
                  avatar: avatars[newIndex],
                });
              }}
              className="btn btn-circle btn-sm"
            >
              ❮
            </button>

            {/* AVATAR IMAGE */}
            <img
              src={avatars[currentIndex]}
              className="w-32 h-32 rounded-full object-cover ring-4 ring-cyan-500 transition-transform hover:scale-105"
            />

            {/* RIGHT BUTTON */}
            <button
              type="button"
              onClick={() => {
                const newIndex = (currentIndex + 1) % avatars.length;

                setCurrentIndex(newIndex);

                // ✅ auto select avatar
                setForm({
                  ...form,
                  avatar: avatars[newIndex],
                });
              }}
              className="btn btn-circle btn-sm"
            >
              ❯
            </button>
          </div>
          <button
            type="button"
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-md transition-colors"
            onClick={() => {
              setAtSecondStage(false);
            }}
          >
            Go Back
          </button>
          <button
            type="submit"
            disabled={isSigningUp}
            className="w-full py-2 px-4 bg-cyan-600 hover:bg-cyan-700 disabled:bg-cyan-400 text-white rounded-md transition-colors"
          >
            {isSigningUp ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      )}
    </>
  );
};

export default SignupForm;
