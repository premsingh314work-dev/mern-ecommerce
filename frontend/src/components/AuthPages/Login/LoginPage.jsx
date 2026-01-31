// SignUpPage.jsx
import AuthLayout from "../AuthLayout";
import LeftCenterBoxLogin from "./LeftCenterBox_login";
import SignUpImage from "../../../assets/AuthImages/SignUpImage.png"

function SignUpPage() {
  return (
    <AuthLayout sideImage={SignUpImage}>
      <LeftCenterBoxLogin />
    </AuthLayout>
  );
}

export default SignUpPage;
