import SignUpImage from "../../../assets/AuthImages/SignUpImage.png";
import LeftCenterBox from "./LeftCenterBox";
import RightCenterBox from "./RightCenterBox";
function CenterBoxSignup() {
  return (
    <>
      {/* Main card */}
      <div className="h-auto w-[50%] flex border  rounded-lg overflow-hidden">
        {/* LEFT FORM SECTION */}
        <LeftCenterBox/>

        {/* RIGHT IMAGE SECTION */}
        <RightCenterBox SignUpImage={SignUpImage}/>
      </div>
    </>
  );
}

export default CenterBoxSignup;
