import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import { fetchChangePwd_Ha } from "../API/API";
import { toast } from "react-toastify";

const ChangePasswordHa = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Lấy search params từ location
  const searchParams = new URLSearchParams(location.search);

  // Lấy giá trị của token và email từ search params
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const {
    handleSubmit: SubmitSignup,
    register: changePwd_data,
    formState: { errors },
    getValues,
  } = useForm<{ password: string; confirmPassword: string }>();

  const SubmitChangePwd_Loi = async (changePwd_data: {
    password: string;
    confirmPassword: string;
  }) => {
    if (token && email) {
      const response = await fetchChangePwd_Ha(token, {
        email: email,
        token: token,
        password: changePwd_data.password,
        password_confirmation: changePwd_data.confirmPassword,
      });
      if (response?.ok) {
        toast.success("Đổi mật khẩu thành công!\nVui lòng đăng nhập lại");
        navigate(`/auth/login/Ha`)
      } else {
        toast.info("Đổi mật khẩu không thành công");
      }
      console.log(token, email);
    }
  };

  return (
    <div>
      {/* logo */}
      <div className="w-[197px] h-10 ml-[165px] mt-[53px] flex justify-between items-center">
        <div className="flex h-10 items-center">
          <div className="w-[14px] h-10 bg-primary-500"></div>
          <div className="w-[20.73px] h-10 rounded-l-full overflow-hidden bg-primary-500"></div>
        </div>
        <div className="w-[145px] h-6 ml-4 font-['Inter'] font-bold text-[28px] leading-6 text-primary-900">
          Insight CO
        </div>
      </div>
      {/* Content */}
      <form
        className="sm:w-[540px] w-[480px] h-[590px] sm:sm:ml-[165px] ml-[64p] ml-[64px] mt-[48px] flex flex-col gap-8"
        onSubmit={SubmitSignup(SubmitChangePwd_Loi)}
      >
        {/* title */}
        <div className="w-[355px] h-[68px] flex flex-col gap-3">
          <div className="w-[355px] h-[68px] font-['Inter'] font-bold text-[24px] leading-[36px] text-gray-900">
            Change Password
          </div>
          <div className="h-5 font-['Inter'] font-medium text-[14px] leading-5 text-gray-500">
            Log In with your new password
          </div>
        </div>
        {/* text filed */}
        <div className="sm:w-[540px] w-[480px] h-[206px] flex flex-col gap-4">
          <div className="w-[540px] h-24 flex flex-col gap-4">
            <div className="text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight">
              New Password
            </div>
            <div>
              <div className="w-[540px] h-[58px] bg-white rounded-xl border border-gray-100 flex items-center justify-evenly">
                <input
                  placeholder="New Password"
                  className="w-[432px] h-[21px] border-transparent focus:outline-none focus:ring-0 text-gray-400 text-base font-medium font-['Inter'] leading-snug tracking-tight"
                  {...changePwd_data("password", {
                    required: true,
                    pattern:
                      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                  })}
                />
                <span className="text-red">
                  {errors.password?.type === "required" && "*"}
                </span>
              </div>
              {errors.password?.type === "pattern" && (
                <div className="text-red text-[10px]">
                  "Ít nhất 8 ký tự, một chữ hoa, một chữ thường, một chữ số, một
                  ký tự đặc biệt"
                </div>
              )}
            </div>
          </div>
          <div className="w-[540px] h-24 flex flex-col gap-4">
            <div className="left-0 text-gray-900 text-base font-medium font-['Inter'] leading-snug tracking-tight">
              Confirm Password
            </div>
            <div>
              <div className="w-[540px] h-[58px] left-0  bg-white rounded-xl border border-gray-100 flex items-center justify-evenly">
                <input
                  placeholder="Confirm Password"
                  className="w-[432px] h-[21px] border-transparent focus:outline-none focus:ring-0 text-gray-400 text-base font-medium font-['Inter'] leading-snug tracking-tight"
                  {...changePwd_data("confirmPassword", {
                    required: true,
                    validate: (value) =>
                      value === getValues("confirmPassword") ||
                      "Mật khẩu không khớp",
                  })}
                ></input>
                <span className="text-red">
                  {errors.confirmPassword?.type === "required" && "*"}
                </span>
              </div>
              {errors.confirmPassword?.type === "validate" && (
                <div className="text-red text-[10px]">
                  "Mật khẩu không khớp"
                </div>
              )}
            </div>
          </div>
        </div>
        {/* buttn */}
        <button
          type="submit"
          className="cursor-pointer sm:w-[540px] w-[480px] h-[58px] rounded-[12px] bg-primary-500 flex items-center justify-center"
        >
          <div className=" h-[22px] font-['Inter'] font-medium leading-[22.4px] tracking-[0.3px] text-white">
            Change Password
          </div>
        </button>
        {/* or */}
        <div className="w-[538px] h-5 flex justify-evenly items-center">
          <hr className="w-[203px] border-[1px] border-gray-50"></hr>
          <div className="w-[102px] h-5 font-['Inter'] font-medium text-[14px] text-gray-500">
            Or login with
          </div>
          <hr className="w-[203px] border-[1px] border-gray-50"></hr>
        </div>
        {/*  */}
        <div className="cursor-pointer sm:w-[540px] w-[480px] h-[58px] border-[1px] rounded-[12px] border-gray-100 flex items-center justify-center">
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
            <div className="w-[161px] h-[22px] ml-3 font-['Inter'] font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-gray-900">
              Log In with Google
            </div>
          </div>
        </div>
      </form>
      <div className="w-[255px] h-6 mt-[133px] ml-[307px] font-['Inter'] font-medium text-[16px] leading-[22.4px] tracking-[0.3px]">
        <span className="font-['Inter'] font-medium text-[16px] leading-6 text-center text-gray-500">
          Already have an account?
        </span>
        <span className="font-['Inter'] font-medium text-[14px] leading-5 text-center">
          {" "}
        </span>
        <span
          className="cursor-pointer font-['Inter'] font-bold text-[16px] leading-6 text-center text-primary-500"
          onClick={() => {
            navigate(`/auth/login/Ha`);
          }}
        >
          Log In
        </span>
      </div>
    </div>
  );
};

export default ChangePasswordHa;
