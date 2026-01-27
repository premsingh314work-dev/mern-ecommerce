import React from "react";

function RightCenterBox({SignUpImage}) {
  return (
    <div className="w-[40%] h-full bg-white flex items-center justify-center"> 
      {/* image / illustration */}
      <div className="overflow-hidden">
        <img
          className="w-full h-full object-cover scale-110"
          src={SignUpImage}
          alt="signupImage"
        />
      </div>
    </div>
  );
}

export default RightCenterBox;
