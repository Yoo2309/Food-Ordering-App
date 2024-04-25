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
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
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
      <LoginForm loginMode={loginMode} />
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
