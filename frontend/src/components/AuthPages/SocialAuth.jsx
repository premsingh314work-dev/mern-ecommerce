import { Link } from "react-router-dom";

function SocialAuth({ mode }) {
  const isLogin = mode === "login";

  return (
    <>
      <div className="mt-6 flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        <button
          type="button"
          className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded hover:bg-gray-100 transition cursor-pointer"
        >
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
          <span className="text-sm font-medium">
            Continue with Google
          </span>
        </button>

        <p className="text-center text-sm text-gray-600">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            to={isLogin ? "/signup" : "/login"}
            className="text-amber-600 font-semibold hover:underline"
          >
            {isLogin ? "Signup" : "Login"}
          </Link>
        </p>
      </div>
    </>
  );
}

export default SocialAuth;
