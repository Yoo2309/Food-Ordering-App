import { Outlet } from "react-router-dom";
import Flag from "../Component/SVG/Flag";
import IlluBg from "../Component/SVG/IlluBg";
import IlluComponent from "../Component/SVG/IlluComponent";

const AuthComponent = () => {
  return (
    <div className="sm:w-[1440px] w-screen h-[1024px] absolute top-0">
      {/* language */}
      <div className="w-[193px] h-[48px] mt-10 ml-[68px] rounded-[12px] px-4 py-0 bg-primary-50 flex items-center justify-between">
        <Flag />
        <div className="w-[97px] h-6 font-['Inter'] font-bold text-[16px] leading-6 text-gray-300">
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
      {/* content */}
      <Outlet />
      {/* mask gourp */}
      <div className="hidden sm:block absolute bg-primary-50 w-[640px] h-[1024px] ml-[800px] top-0">
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
            <div className="w-[287p] h-[72px] ml-[36px] font-['Inter'] font-bold text-[24px] leading-9 text-center text-gray-900">
              Perfect Place to Analyze Your Social Media
            </div>
            <div className="w-full h-[44px] mt-[16px] font-['Inter'] font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-center text-gray-500">
              Find out your engagement analysis, statistics and social media
              schedule.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
