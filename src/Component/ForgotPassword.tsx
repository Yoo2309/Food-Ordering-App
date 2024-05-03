import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { APIName } from "../types/types";
import { toast } from "react-toastify";
import { fetchForgotPwd } from "../API/API";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    handleSubmit: SubmitForgotPwd,
    register: forgotPwd_data,
    formState: { errors },
  } = useForm<{ email: string }>();

  const SubmitForgotPwd_Bach = async (email: string) => {
    const response = await fetchForgotPwd(
      email,
      `https://zens-restaurant.azurewebsites.net/api/v1/auth/forgot-password`
    );
    if (response?.status === 200) {
      toast.success(`Mật khẩu mới đã được gửi vào email! ${email}`);
    } else {
      toast.info("Quên mật khẩu không thành công!");
    }
  };
  const SubmitForgotPwd_Loi = async (email: string) => {
    const response = await fetchForgotPwd(
      email,
      "https://back-end-zens-training.vercel.app/api/forgot-password"
    );
    if (response?.status === 201) {
      toast.success(`Mã xác thực đã được gửi vào email! ${email}`);
      navigate("/auth/change-password/Loi");
    } else {
      toast.info("Quên mật khẩu không thành công!");
    }
  };
  const SubmitForgotPwd_Ha = async (email: string) => {
    const response = await fetchForgotPwd(
      email,
      "https://ha-food-api.zenslab.com/api/forgot-password"
    );
    if (response?.status === 200) {
      toast.success(`Liên kết xác thực đã được gửi vào email! ${email}`);
    } else {
      toast.info("Quên mật khẩu không thành công!");
    }
  };

  const HandleSubmitForgotPwd: SubmitHandler<{
    email: string;
  }> = (forgotPwd_data: { email: string }) => {
    switch (id) {
      case APIName.Bach:
        SubmitForgotPwd_Bach(forgotPwd_data.email);
        break;
      case APIName.Loi:
        SubmitForgotPwd_Loi(forgotPwd_data.email);
        break;
      case APIName.Ha:
        SubmitForgotPwd_Ha(forgotPwd_data.email);
        break;
    }
  };

  return (
    <div>
      {/* logo */}
      <div className="w-[197px] h-10 ml-[165px] mt-[152px] flex justify-between items-center">
        <div className="flex h-10 items-center">
          <div className="w-[14px] h-10 bg-primary-500"></div>
          <div className="w-[20.73px] h-10 rounded-l-full overflow-hidden bg-primary-500"></div>
        </div>
        <div className="w-[145px] h-6 ml-4 font-['Inter'] font-bold text-[28px] leading-6 text-primary-900">
          Insight CO
        </div>
      </div>
      {/* content */}
      <form
        onSubmit={SubmitForgotPwd(HandleSubmitForgotPwd)}
        className="w-[540px] h-[304px] ml-[165px] mt-12 flex-col justify-start items-start gap-8 inline-flex"
      >
        <div className="flex-col justify-start items-start gap-3 flex">
          <div className="text-gray-900 text-2xl font-bold font-['Inter'] leading-9">
            Forgot Password?
          </div>
          <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
            Enter your email, we will send you the confirmation code
          </div>
        </div>
        <div>
          <div className="w-[540px] h-[58px] bg-white rounded-xl border border-gray-100 flex items-center">
            <div className="w-6 h-6 ml-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.99902 4H19.999C21.099 4 21.999 4.9 21.999 6V18C21.999 19.1 21.099 20 19.999 20H3.99902C2.89902 20 1.99902 19.1 1.99902 18V6C1.99902 4.9 2.89902 4 3.99902 4Z"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21.999 6L11.999 13L1.99902 6"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              className="w-[445px] h-[21px] mt-[2px] ml-[12px] border-transparent focus:outline-none focus:ring-0 font-['Inter'] font-medium text-[16px] leading-[22.4] tracking-[0.3px] text-gray-900"
              placeholder="Email"
              {...forgotPwd_data("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            />
            <span className="text-red">
              {errors.email?.type === "required" && "*"}
            </span>
          </div>
          {errors.email?.type === "pattern" && (
            <div className="text-red text-[10px]">
              "Email không đúng định dạng"
            </div>
          )}
        </div>
        <button type="submit" className="w-[540px] h-[58px] relative">
          <div className="w-[540px] h-[58px] left-0 top-0 absolute bg-primary-500 rounded-xl" />
          <div className="left-[246px] top-[18px] absolute text-center text-white text-base font-medium font-['Inter'] leading-snug tracking-tight">
            Log In
          </div>
        </button>
        <button
          onClick={() => {
            navigate(`/auth/login/${id}`);
          }}
          className="text-center text-primary-500 text-base font-bold font-['Inter'] leading-normal"
        >
          Back to Log In
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
