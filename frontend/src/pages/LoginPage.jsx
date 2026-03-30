import React, { useEffect } from "react";
import LoginForm from "../components/LoginForm";
import { MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="h-screen bg-gradient-to-r from-slate-900 to-slate-700 flex justify-center items-center ">
      <div className="card bg-base-100 h-[70%] w-[60%] shadow-sm flex flex-row border border-white/10">
        <div className="card-body flex items-center border-r border-white/10">
          <div className="flex flex-col items-center ">
            <MessageCircle size={50} />
            <h3 className="text-3xl text-slate-300"> Welcome Back</h3>
            <p className="text-sm text-slate-100/50">login to start shopping</p>
          </div>

          <div className="w-full">
            <LoginForm />
          </div>

          <div>
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-400">
                <span>Sign up</span>
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

export default LoginPage;
