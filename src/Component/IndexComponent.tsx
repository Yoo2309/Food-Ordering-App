import { useNavigate } from "react-router-dom";
import { APIName } from "../types/types";

const IndexComponent = () => {
  const navigate = useNavigate();
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center gap-4">
      <div
        className="min-w-[240px] px-20 py-5 bg-primary-200 rounded-[12px] font-bold text-gray-900 cursor-pointer"
        onClick={() => {
          navigate(`/${APIName.Loi}`);
        }}
      >
        LOI'S API
      </div>
      <div
        className="min-w-[240px] px-20 py-5 bg-primary-200 rounded-[12px] font-bold text-gray-900 cursor-pointer"
        onClick={() => {
          navigate(`/${APIName.Bach}`);
        }}
      >
        BACH'S API
      </div>
      <div
        className="min-w-[240px] px-20 py-5 bg-primary-200 rounded-[12px] font-bold text-gray-900 cursor-pointer"
        onClick={() => {
          navigate(`/${APIName.Ha}`);
        }}
      >
        HA'S API
      </div>
    </div>
  );
};

export default IndexComponent;
