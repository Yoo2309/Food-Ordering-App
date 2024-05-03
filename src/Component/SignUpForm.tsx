import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { SignUpInfo, APIName } from "../types/types";
import {
  setShowPassword,
  setInputPassword,
} from "../redux/slices/LoginStateSlice";

const SignUpForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const loginState = useSelector(
    (state: RootState) => state.rootReducer.loginState
  );

  const {
    handleSubmit: SubmitSignup,
    register: signup_data,
    formState: { errors: error_signup },
  } = useForm<SignUpInfo>();

  //Loi's API
  const submitSignupLoi = async (signup_data: SignUpInfo) => {
    try {
      const response = await fetch(
        `https://back-end-zens-training.vercel.app/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signup_data.username,
            email: signup_data.email,
            password: signup_data.password,
          }),
        }
      );
      if (response.ok) {
        // return response;
        toast.success("Đăng ký thành công!");
        navigate(`/auth/login/${id}`);
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      toast.error("Đăng ký xảy ra lỗi");
    }
  };
  //Bach's API
  const submitSignupBach = async (signup_data: SignUpInfo) => {
    try {
      const response = await fetch(
        `https://zens-restaurant.azurewebsites.net/api/v1/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signup_data.username,
            email: signup_data.email,
            password: signup_data.password,
          }),
        }
      );
      if (response.ok) {
        // return response;
        toast.success("Đăng ký thành công!");
        navigate(`/auth/login/${id}`);
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      toast.error("Đăng ký xảy ra lỗi");
    }
  };
  //Ha's API
  const submitSignupHa = async (signup_data: SignUpInfo) => {
    try {
      const response = await fetch(
        `https://ha-food-api.zenslab.com/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signup_data.username,
            email: signup_data.email,
            password: signup_data.password,
            password_confirmation: signup_data.password,
          }),
        }
      );
      if (response.ok) {
        // return response;
        toast.success("Đăng ký thành công!");
        navigate(`/auth/login/${id}`);
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      toast.error("Đăng ký xảy ra lỗi");
    }
  };
  //NhuY's API
  const submitSignupNhuY = async (signup_data: SignUpInfo) => {
    try {
      const response = await fetch(
        `https://y-food-api.zenslab.com/api/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: signup_data.username,
            email: signup_data.email,
            password: signup_data.password,
          }),
        }
      );
      if (response.status) {
        // return response;
        toast.success("Đăng ký thành công!");
        navigate(`/auth/login/${id}`);
      } else {
        toast.error("Đăng ký thất bại");
      }
    } catch (error) {
      toast.error("Đăng ký xảy ra lỗi");
    }
  };

  const handleSubmitSignup: SubmitHandler<SignUpInfo> = (
    signup_data: SignUpInfo,
    e
  ) => {
    switch (id) {
      case APIName.Loi:
        e?.preventDefault();
        submitSignupLoi(signup_data);
        break;
      case APIName.Bach:
        submitSignupBach(signup_data);
        break;
      case APIName.Ha:
        submitSignupHa(signup_data);
        break;
      case APIName.NhuY:
        submitSignupNhuY(signup_data);
        break;
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
        onSubmit={SubmitSignup(handleSubmitSignup)}
      >
        {/* title */}
        <div className="w-[355px] h-[68px] flex flex-col gap-3">
          <div className="w-[355px] h-[68px] font-['Inter'] font-bold text-[24px] leading-[36px] text-gray-900">
            Create Account to Get Started
          </div>
          <div className="w-[158px] h-5 font-['Inter'] font-medium text-[14px] leading-5 text-gray-500">
            Sign up and get started
          </div>
        </div>
        {/* text filed */}
        <div className="sm:w-[540px] w-[480px] h-[206px] flex flex-col gap-4">
          {/* username */}
          <div className="w-full h-[58px] border-[1px] rounded-[12px] border-gray-100 flex items-center">
            <div className="w-6 h-6 ml-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.999 21V19C19.999 17.9391 19.5776 16.9217 18.8274 16.1716C18.0773 15.4214 17.0599 15 15.999 15H7.99902C6.93816 15 5.92074 15.4214 5.1706 16.1716C4.42045 16.9217 3.99902 17.9391 3.99902 19V21"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11.999 11C14.2082 11 15.999 9.20914 15.999 7C15.999 4.79086 14.2082 3 11.999 3C9.78988 3 7.99902 4.79086 7.99902 7C7.99902 9.20914 9.78988 11 11.999 11Z"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              className="w-[445px] h-[21px] mt-[2px] ml-[12px] border-transparent focus:outline-none focus:ring-0 font-['Inter'] font-medium text-[16px] leading-[22.4] tracking-[0.3px] text-gray-900"
              placeholder="Username"
              {...signup_data("username", { required: true })}
            ></input>
            <span className="text-red">
              {error_signup.username?.type === "required" && "*"}
            </span>
          </div>
          {/* email */}
          <div className="w-full h-[58px] border-[1px] rounded-[12px] border-gray-100 flex items-center">
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
              {...signup_data("email", {
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              })}
            ></input>
            <span className="text-red">
              {error_signup.email?.type === "required" && "*"}
            </span>
          </div>
          {error_signup.email?.type === "pattern" && (
            <div className="text-red text-[10px]">
              "Email đã nhập không đúng định dạng"
            </div>
          )}
          {/* password */}
          <div className="w-full h-[58px] border-[1px] rounded-[12px] border-gray-100 flex items-center">
            <div className="w-6 h-6 ml-4">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.999 11H4.99902C3.89445 11 2.99902 11.8954 2.99902 13V20C2.99902 21.1046 3.89445 22 4.99902 22H18.999C20.1036 22 20.999 21.1046 20.999 20V13C20.999 11.8954 20.1036 11 18.999 11Z"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.99902 11V7C6.99902 5.67392 7.52581 4.40215 8.46349 3.46447C9.40117 2.52678 10.6729 2 11.999 2C13.3251 2 14.5969 2.52678 15.5346 3.46447C16.4722 4.40215 16.999 5.67392 16.999 7V11"
                  stroke="#96A0B5"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <input
              className="w-[445px] h-[21px] mt-[2px] ml-[12px] border-transparent focus:outline-none focus:ring-0 font-['Inter'] font-medium text-[16px] leading-[22.4] tracking-[0.3px] text-gray-900"
              placeholder="Password"
              type={`${loginState.showPassword ? "text" : "password"}`}
              {...signup_data("password", {
                required: true,
                pattern:
                  /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()\-_=+{};:,<.>]).{8,}/,
              })}
              onFocus={() => {
                dispatch(setInputPassword());
              }}
              onBlur={() => {
                dispatch(setInputPassword());
              }}
            ></input>
            <span className="text-red">
              {error_signup.password?.type === "required" && "*"}
            </span>
            <div className="w-6 h-6 ml-[3px]">
              {!loginState.showPassword ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    dispatch(setShowPassword());
                  }}
                >
                  <g clipPath="url(#clip0_24_31734)">
                    <path
                      d="M9.9 4.23999C10.5883 4.07887 11.2931 3.99833 12 3.99999C19 3.99999 23 12 23 12C22.393 13.1356 21.6691 14.2047 20.84 15.19M14.12 14.12C13.8454 14.4147 13.5141 14.6511 13.1462 14.8151C12.7782 14.9791 12.3809 15.0673 11.9781 15.0744C11.5753 15.0815 11.1752 15.0074 10.8016 14.8565C10.4281 14.7056 10.0887 14.481 9.80385 14.1961C9.51897 13.9113 9.29439 13.5719 9.14351 13.1984C8.99262 12.8248 8.91853 12.4247 8.92563 12.0219C8.93274 11.6191 9.02091 11.2218 9.18488 10.8538C9.34884 10.4858 9.58525 10.1546 9.88 9.87999M17.94 17.94C16.2306 19.243 14.1491 19.9649 12 20C5 20 1 12 1 12C2.24389 9.68189 3.96914 7.6566 6.06 6.05999L17.94 17.94Z"
                      stroke="#96A0B5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 1L23 23"
                      stroke="#96A0B5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_24_31734">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <img
                  onClick={() => {
                    dispatch(setShowPassword());
                  }}
                  width="24"
                  height="24"
                  src="https://img.icons8.com/parakeet-line/24/visible.png"
                  alt="visible"
                />
              )}
            </div>
          </div>
          {error_signup.password?.type === "pattern" && (
            <div className="text-red text-[10px]">
              "Ít nhất 8 ký tự, một chữ hoa, một chữ thường, một chữ số, một ký
              tự đặc biệt"
            </div>
          )}
          {/* password strength */}
          {loginState.inputPassword ? (
            <div className="w-full h-5 flex items-center justify-between">
              <svg
                width="96"
                height="4"
                viewBox="0 0 96 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="95.7798" height="4" fill="#FDB92C" />
              </svg>
              <svg
                width="96"
                height="4"
                viewBox="0 0 96 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="95.7798" height="4" fill="#FDB92C" />
              </svg>
              <svg
                width="97"
                height="4"
                viewBox="0 0 97 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.981628" width="95.7798" height="4" fill="#ECEFF4" />
              </svg>
              <svg
                width="97"
                height="4"
                viewBox="0 0 97 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect x="0.981628" width="95.7798" height="4" fill="#ECEFF4" />
              </svg>

              <div>Standard</div>
            </div>
          ) : (
            <></>
          )}
        </div>
        {/*  */}
        <div className="w-[339px] h-5 flex gap-3 items-center">
          <input
            type="checkbox"
            className="w-5 h-5 cursor-pointer border-[1px] rounded-[4px] border-gray-50"
          />
          <div className="w-[307px] h-5 font-['Inter'] font-medium text-[16px] leading-[22.4px] tracking-[0.3px] text-gray-500">
            I agree to the Terms & Conditions
          </div>
        </div>
        {/* buttn */}
        <button
          type="submit"
          className="cursor-pointer sm:w-[540px] w-[480px] h-[58px] rounded-[12px] bg-primary-500 flex items-center justify-center"
        >
          <div className="w-[62px] h-[22px] font-['Inter'] font-medium leading-[22.4px] tracking-[0.3px] text-white">
            Sign Up
          </div>
        </button>
        {/* or */}
        <div className="w-[538px] h-5 flex justify-evenly items-center">
          <hr className="w-[203px] border-[1px] border-gray-50"></hr>
          <div className="w-[102px] h-5 font-['Inter'] font-medium text-[14px] text-gray-500">
            Or sign up with
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
              Sign Up with Google
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
            navigate(`/auth/login/${id}`);
          }}
        >
          Log In
        </span>
      </div>
    </div>
  );
};

export default SignUpForm;
