// src/components/Auth/AuthLayout.
import RightCenterBox from "./Signup/RightCenterBox";

function AuthLayout({ children, sideImage }) {
  return (
    <div className="h-screen w-screen bg-white flex flex-col items-center justify-center">
      <div className="h-auto w-[50%] flex border rounded-lg overflow-hidden">
        {/* LEFT SECTION: This will now hold either Login or Signup content */}
        <div className="bg-[#F7F7F7] w-[60%] flex flex-col border-r p-2">
          {children}
        </div>

        {/* RIGHT SECTION: Reusing your existing image component */}
        <RightCenterBox SignUpImage={sideImage} />
      </div>
    </div>
  );
}

export default AuthLayout;