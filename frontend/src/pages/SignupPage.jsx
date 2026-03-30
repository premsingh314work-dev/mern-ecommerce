import React from "react";
import SignupForm from "../components/SignupForm";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const SignupPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center items-center ">
      <div className="card bg-base-100 h-auto w-[60%] shadow-sm flex flex-row border border-white/10">
        <div className="card-body flex items-center border-r border-white/10">
          <div className="flex flex-col items-center ">
            <MessageCircle size={50} />
            <h3 className="text-3xl text-slate-300">Create Account</h3>
            <p className="text-sm text-slate-100/50">Sign up to start shopping</p>
          </div>

          <div className="w-full">
            <SignupForm />
          </div>

          <div>
            <p> 
              Already have an account?{" "}
              <Link to="/login" className="text-blue-400">
                <span>Login</span>
              </Link>
            </p>
          </div>
        </div>
        <figure className="">
          <img
            src="/Signup.png"
            alt="signup image"
            className="w-full h-full object-cover scale-110"
          />
        </figure>
      </div>
    </div>
  );
};

export default SignupPage;
