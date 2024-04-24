import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import Flag from "./SVG/Flag";
import IlluBg from "./SVG/IlluBg";
import IlluComponent from "./SVG/IlluComponent";

const LoginComponent = ({ loginMode }: { loginMode: boolean }) => {
  const navigate = useNavigate();
  return (
    <div className="w-[1440px] h-[1024px] absolute top-0">
      {/* language */}
      <div className="w-[193px] h-[48px] mt-10 ml-[68px] rounded-[12px] px-4 py-0 bg-primary-50 flex items-center justify-between">
        <Flag />
        <div className="w-[97px] h-6 font-inter font-bold text-[16px] leading-6 text-gray-300">
          English (US)
        </div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 9L12 15L18 9"
            stroke="#96A0B5"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      {/* logo */}
      <div className="w-[197px] h-10 ml-[165px] mt-[53px] flex justify-between items-center">
        <div className="flex h-10 items-center">
          <div className="w-[14px] h-10 bg-primary-500"></div>
          <div className="w-[20.73px] h-10 rounded-l-full overflow-hidden bg-primary-500"></div>
        </div>
        <div className="w-[145px] h-6 ml-4 font-inter font-bold text-[28px] leading-6 text-primary-900">
          Insight CO
        </div>
      </div>
      {/* content */}
      <div className="w-[540px] h-[590px] ml-[165px] mt-[48px] flex flex-col gap-8">
        {/* title */}
        <div className="w-[355px] h-[68px] flex flex-col gap-3">
          <div className="w-[355px] h-[68px] font-inter font-bold text-[24px] leading-[36px] text-gray-900">
            Create Account to Get Started
          </div>
          <div className="w-[158px] h-5 font-inter font-medium text-[14px] leading-5 text-gray-500">
            Sign up and get started
          </div>
        </div>
        {/* text filed */}
        <LoginForm loginMode={loginMode} />
        {/*  */}
        <div className="w-[339px] h-5 flex gap-3 items-center">
          <input type="checkbox" className="w-5 h-5" />
          <div className="w-[307px] h-5 font-inter font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-gray-500">
            I agree to the Terms & Conditions
          </div>
        </div>
        {/* buttn */}
        <div className="w-[540px] h-[58px] rounded-[12px] bg-primary-500 flex items-center justify-center">
          <div className="w-[62px] h-[22px] font-inter font-medium leading-[22.4px] tracking-[0.3px] text-white">
            Sign Up
          </div>
        </div>
        {/* or */}
        <div className="w-[538px] h-5 flex justify-evenly items-center">
          <hr className="w-[203px] border-[1px] border-gray-50"></hr>
          <div className="w-[102px] h-5 font-inter font-medium text-[14px] text-gray-500">
            Or sign up with
          </div>
          <hr className="w-[203px] border-[1px] border-gray-50"></hr>
        </div>
        {/*  */}
        <div className="w-[540px] h-[58px] border-[1px] rounded-[12px] border-gray-100 flex items-center justify-center">
          <div className="w-[197px] h-6 flex items-center">
            <div className="w-6 h-6">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C16.827 16.3285 14.6115 18 12 18C8.6865 18 6 15.3135 6 12C6 8.6865 8.6865 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C6.4775 2 2 6.4775 2 12C2 17.5225 6.4775 22 12 22C17.5225 22 22 17.5225 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#FFC107"
                />
                <path
                  d="M3.15295 7.3455L6.43845 9.755C7.32745 7.554 9.48045 6 12 6C13.5295 6 14.921 6.577 15.9805 7.5195L18.809 4.691C17.023 3.0265 14.634 2 12 2C8.15895 2 4.82795 4.1685 3.15295 7.3455Z"
                  fill="#FF3D00"
                />
                <path
                  d="M12 22C14.583 22 16.93 21.0115 18.7045 19.404L15.6095 16.785C14.5718 17.5742 13.3038 18.001 12 18C9.39903 18 7.19053 16.3415 6.35853 14.027L3.09753 16.5395C4.75253 19.778 8.11353 22 12 22Z"
                  fill="#4CAF50"
                />
                <path
                  d="M21.8055 10.0415H21V10H12V14H17.6515C17.2571 15.1082 16.5467 16.0766 15.608 16.7855L15.6095 16.7845L18.7045 19.4035C18.4855 19.6025 22 17 22 12C22 11.3295 21.931 10.675 21.8055 10.0415Z"
                  fill="#1976D2"
                />
              </svg>
            </div>
            <div className="w-[161px] h-[22px] ml-3 font-inter font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-gray-900">
              Sign Up with Google
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <div className="w-[255px] h-6 mt-[133px] ml-[307px] font-inter font-medium text-[16px] leading-[22.4px] tracking-[0.3px]">
        <span className="font-inter font-medium text-[16px] leading-6 text-center text-gray-500">
          {loginMode ? "Don’t have an account?" : "Already have an account?"}
        </span>
        <span className="font-inter font-medium text-[14px] leading-5 text-center">
          {" "}
        </span>
        <span
          className="cursor-pointer font-inter font-bold text-[16px] leading-6 text-center text-primary-500"
          onClick={() => {
            if (loginMode) {
              navigate("/signup");
            } else {
              navigate("/login");
            }
          }}
        >
          {loginMode ? "Sign Up" : "Log In"}
        </span>
      </div>
      {/* mask gourp */}
      <div className="absolute bg-primary-50 w-[640px] h-[1024px] ml-[800px] top-0">
        <div className="absolute">
          <IlluBg />
        </div>
        {/* group */}
        <div className="absolute w-[529px] h-[786px] mt-[86px] ml-[55px]">
          {/* illu */}
          <div className="w-full h-[582px]">
            <IlluComponent />
          </div>
          {/* title */}
          <div className="w-[359px] h-[132px] mt-[72px] ml-[140px]">
            <div className="w-[287p] h-[72px] ml-[36px] font-inter font-bold text-[24px] leading-9 text-center text-gray-900">
              Perfect Place to Analyze Your Social Media
            </div>
            <div className="w-full h-[44px] mt-[16px] font-inter font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-center text-gray-500">
              Find out your engagement analysis, statistics and social media
              schedule.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
