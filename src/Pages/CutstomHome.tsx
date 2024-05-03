import Dribbble from "../Component/SVG/Dribbble";
import Twitter from "../Component/SVG/Twitter";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  refresh_login_Loi,
  fetch_UserData_Loi,
  initialUser,
  handle_login_Loi,
  logout_Loi,
} from "../redux/slices/authSliceLoi";
import {
  refresh_login_Bach,
  fetch_UserData_Bach,
  logout_Bach,
  handle_login_Bach,
} from "../redux/slices/authSliceBach";
import { useNavigate, useParams } from "react-router-dom";
import { APIName, CurrentUser, Token } from "../types/types";
import { toast } from "react-toastify";
import {
  fetch_UserData_Ha,
  logout_Ha,
  refresh_login_Ha,
  refresh_token_Ha,
} from "../redux/slices/authSliceHa";
import {
  fetchLogout,
  fetchUserData,
  refresh_token_Bach,
  refresh_token_Loi,
} from "../API/API";
import {
  fetch_UserData_NhuY,
  logout_NhuY,
  refresh_login_NhuY,
} from "../redux/slices/authSliceNhuY";
import ChangePassword from "../Component/ChangePassword";

const CutstomHome = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const user: CurrentUser = useSelector((state: RootState) => {
    switch (id) {
      case APIName.Loi:
        return state.rootReducer.userLoi;
      case APIName.Bach:
        return state.rootReducer.userBach;
      case APIName.Ha:
        return state.rootReducer.userHa;
      case APIName.NhuY:
        return state.rootReducer.userNhuY;
      default:
        return initialUser;
    }
  });
  const dispatch = useDispatch<AppDispatch>();

  const HandleLogout = async () => {
    localStorage.removeItem(`${id}_accessToken`);
    localStorage.removeItem(`${id}_refreshToken`);
    switch (id) {
      case APIName.Loi:
        dispatch(logout_Loi());
        break;
      case APIName.Bach:
        dispatch(logout_Bach());
        break;
      case APIName.Ha:
        dispatch(logout_Ha());
        break;
      case APIName.NhuY:
        dispatch(logout_NhuY());
        break;
    }
    navigate("/");
  };

  //Loi's API
  const HandleLogoutLoi = async (access_token: string) => {
    const response = await fetchLogout(
      access_token,
      `https://back-end-zens-training.vercel.app/api/logout`,
      "GET"
    );
    if (response?.ok) {
      HandleLogout();
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };
  const HandleRefreshLoginLoi = async (token: Token) => {
    const resp = await fetchUserData(
      token.accessToken.replace(/"/g, ""),
      "https://back-end-zens-training.vercel.app/api/profile"
    );
    if (resp?.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_Loi(data));
    } else {
      if (resp?.status === 401) {
        const resp = await refresh_token_Loi(
          token.refreshToken.replace(/"/g, "")
        );
        if (resp) {
          if (resp.status === 200) {
            const data = await resp.json();
            dispatch(handle_login_Loi(data));
          }
        }
      }
    }
  };

  //Bach's API
  const HandlRefreshLoginBach = async (token: Token, id: string) => {
    const resp = await fetchUserData(
      token.accessToken.replace(/"/g, ""),
      `https://zens-restaurant.azurewebsites.net/api/v1/user/profile/${id}`
    );
    if (resp.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_Bach(data));
    } else if (resp?.status === 401) {
      const resp = await refresh_token_Bach({
        accessToken: token.accessToken.replace(/"/g, ""),
        refreshToken: token.refreshToken.replace(/"/g, ""),
      });
      if (resp) {
        if (resp.status === 200) {
          const data = await resp.json();
          dispatch(handle_login_Bach(data));
        } else if (resp.status === 400) {
          toast.info("Phiên đăng nhập hết hạn");
          HandleLogout();
        }
      }
    }
  };

  //Ha's API
  const HandleRefreshLoginHa = async (token: Token) => {
    const resp = await fetchUserData(
      token.accessToken.replace(/"/g, ""),
      "https://ha-food-api.zenslab.com/api/profile"
    );
    if (resp.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_Ha(data.data));
    } else if (resp.status === 500) {
      dispatch(refresh_token_Ha(token.refreshToken.replace(/"/g, "")));
    }
  };

  //NhuY's API
  const HandleRefreshLoginNhuY = async (token: Token) => {
    const resp = await fetchUserData(
      token.accessToken.replace(/"/g, ""),
      "https://y-food-api.zenslab.com/api/profile"
    );
    console.log(resp);
    if (resp.ok) {
      const data = await resp.json();
      dispatch(fetch_UserData_NhuY(data.data));
    } else if (resp.status === 500) {
    }
  };
  const HandleLogoutNhuY = async (access_token: string) => {
    const response = await fetchLogout(
      access_token,
      `https://y-food-api.zenslab.com/api/logout`,
      "POST"
    );
    if (response?.ok) {
      HandleLogout();
    } else {
      toast.error("Đăng xuất thất bại");
    }
  };

  useEffect(() => {
    if (!user.token.accessToken) {
      let access_token_stored = localStorage.getItem(`${id}_accessToken`);
      let refresh_token_stored = localStorage.getItem(`${id}_refreshToken`);
      switch (id) {
        case APIName.Loi:
          if (refresh_token_stored && access_token_stored) {
            dispatch(
              refresh_login_Loi({
                accessToken: access_token_stored.replace(/"/g, ""),
                refreshToken: refresh_token_stored.replace(/"/g, ""),
              })
            );
          } else {
            navigate(`/auth/login/${id}`);
          }
          break;
        case APIName.Bach:
          if (access_token_stored && refresh_token_stored) {
            dispatch(
              refresh_login_Bach({
                accessToken: access_token_stored,
                refreshToken: refresh_token_stored,
              })
            );
          } else {
            navigate(`/auth/login/${id}`);
          }
          break;
        case APIName.Ha:
          if (access_token_stored && refresh_token_stored) {
            dispatch(
              refresh_login_Ha({
                accessToken: access_token_stored,
                refreshToken: refresh_token_stored,
              })
            );
          } else {
            navigate(`/auth/login/${id}`);
          }
          break;
        case APIName.NhuY:
          if (access_token_stored) {
            dispatch(refresh_login_NhuY(access_token_stored));
          } else {
            navigate(`/auth/login/${id}`);
          }
          break;
      }
    }
  }, []);

  useEffect(() => {
    switch (id) {
      case APIName.Loi:
        if (user.token.accessToken && user.token.refreshToken) {
          HandleRefreshLoginLoi(user.token);
        }
        break;
      case APIName.Bach:
        if (user.token && user.userInfo.id) {
          HandlRefreshLoginBach(user.token, user.userInfo.id);
        }
        break;
      case APIName.Ha:
        if (user.token.accessToken) {
          HandleRefreshLoginHa(user.token);
        }
        break;
      case APIName.NhuY:
        console.log("change");
        if (user.token.accessToken) {
          console.log("get user");
          HandleRefreshLoginNhuY(user.token);
        }
        break;
    }
  }, [user.token.accessToken, user.token.refreshToken, user.userInfo.id]);

  return (
    <div className="w-[1440px] h-[1024px] relative bg-primary-50">
      <div className="w-[1440px] h-20 left-0 top-0 absolute">
        <div className="w-[1440px] h-20 left-0 top-0 absolute bg-white border border-gray-100" />
        <div className="w-[76px] h-10 left-[280px] top-[20px] absolute">
          <div className="w-[76px] h-10 left-0 top-0 absolute bg-gray-50 rounded-[26px] border border-gray-100" />
          <div className="w-8 h-8 left-[4px] top-[4px] absolute bg-white rounded-full shadow" />
          <div className="w-5 h-5 left-[10px] top-[10px] absolute">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_14_4413)">
                <path
                  d="M10.0007 14.1663C12.3018 14.1663 14.1673 12.3009 14.1673 9.99967C14.1673 7.69849 12.3018 5.83301 10.0007 5.83301C7.69946 5.83301 5.83398 7.69849 5.83398 9.99967C5.83398 12.3009 7.69946 14.1663 10.0007 14.1663Z"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 0.833008V2.49967"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M10 17.5V19.1667"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.51758 3.5166L4.70091 4.69993"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3008 15.2998L16.4841 16.4831"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M0.833984 10H2.50065"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M17.5 10H19.1667"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M3.51758 16.4831L4.70091 15.2998"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M15.3008 4.69993L16.4841 3.5166"
                  stroke="#347AE2"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_14_4413">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="w-5 h-5 left-[46px] top-[10px] absolute">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.4994 10.6583C17.3683 12.0768 16.836 13.4287 15.9646 14.5557C15.0933 15.6826 13.919 16.5382 12.5792 17.0221C11.2394 17.5061 9.78942 17.5984 8.39901 17.2884C7.00861 16.9784 5.73526 16.2788 4.72795 15.2715C3.72064 14.2642 3.02105 12.9908 2.71102 11.6004C2.40099 10.21 2.49336 8.76007 2.97731 7.42025C3.46127 6.08042 4.31679 4.90614 5.44377 4.03479C6.57076 3.16345 7.92259 2.63109 9.3411 2.5C8.51061 3.62356 8.11097 5.00787 8.21487 6.40118C8.31878 7.79448 8.91931 9.10422 9.90726 10.0922C10.8952 11.0801 12.2049 11.6807 13.5983 11.7846C14.9916 11.8885 16.3759 11.4888 17.4994 10.6583V10.6583Z"
                stroke="#96A0B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="left-[368px] top-[30px] absolute text-gray-400 text-sm font-medium font-['Inter'] leading-tight">
          Light
        </div>
        <div className="left-[1188px] top-[20px] absolute justify-end items-center gap-3 inline-flex">
          <div className="w-10 h-10 relative">
            <div className="w-10 h-10 left-0 top-0 absolute rounded-full border border-gray-100" />
            <div className="w-10 h-10 flex items-center justify-center text-primary-500 text-sm font-bold font-['Inter'] leading-tight">
              3+
            </div>
          </div>
          <div className="opacity-30 w-[52px] h-10 relative">
            <div className="w-10 h-10 left-[12px] top-0 absolute">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#347AE2" />
                <path
                  d="M10.1825 24.8219C12.69 29.9631 18.8905 32.0981 24.0317 29.5905L14.9512 10.9727C9.80999 13.4802 7.67498 19.6807 10.1825 24.8219Z"
                  fill="#97C1FF"
                />
                <circle
                  cx="25.7471"
                  cy="17.6282"
                  r="4.64286"
                  transform="rotate(64 25.7471 17.6282)"
                  fill="#F5F9FF"
                />
              </svg>
            </div>
            <div className="w-6 h-6 left-0 top-[8px] absolute">
              <Dribbble />
            </div>
          </div>
          <div className="w-[52px] h-10 relative">
            <div className="w-10 h-10 left-[12px] top-0 absolute">
              <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="20" r="20" fill="#347AE2" />
                <path
                  d="M10.1825 24.8219C12.69 29.9631 18.8905 32.0981 24.0317 29.5905L14.9512 10.9727C9.80999 13.4802 7.67498 19.6807 10.1825 24.8219Z"
                  fill="#97C1FF"
                />
                <circle
                  cx="25.7471"
                  cy="17.6282"
                  r="4.64286"
                  transform="rotate(64 25.7471 17.6282)"
                  fill="#F5F9FF"
                />
              </svg>
            </div>
            <div className="w-6 h-6 left-0 top-[8px] absolute">
              <Twitter />
            </div>
          </div>
          <div className="w-10 h-10 relative">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="20"
                cy="20"
                r="19.5"
                stroke="#E0E5ED"
                stroke-dasharray="4 4"
              />
              <path
                d="M20 13V27"
                stroke="#347AE2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M13 20H27"
                stroke="#347AE2"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="w-[247px] h-[1026px] left-0 top-0 absolute">
        <div className="w-[245px] h-[1024px] left-[1px] top-[1px] absolute bg-white border border-gray-100" />
        <div className="w-[112.44px] h-6 left-[29px] top-[29px] absolute flex items-center gap-2">
          <div className="flex h-6 items-center">
            <div className="w-[9px] h-full bg-primary-500"></div>
            <div className="w-[12.44px] h-full rounded-l-full overflow-hidden bg-primary-500"></div>
          </div>
          <div className=" text-primary-900 text-base font-bold font-['Inter'] leading-normal">
            Insight CO
          </div>
        </div>
        <div className="w-[213px] h-[341px] left-[17px] top-[122px] absolute">
          <div className="w-[213px] h-12 left-0 top-[211px] absolute bg-primary-50 rounded-lg" />
          <div className="w-[87px] h-[74px] left-[21px] top-[267px] absolute">
            <div className="w-16 h-4 left-0 top-[18px] absolute">
              <div className="left-[38px] top-0 absolute text-gray-500 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                Plan
              </div>
              <div className="w-1.5 h-1.5 left-0 top-[5px] absolute bg-gray-200 rounded-full" />
            </div>
            <div className="w-[87px] h-4 left-0 top-[58px] absolute">
              <div className="left-[38px] top-0 absolute text-gray-800 text-xs font-medium font-['Inter'] leading-none tracking-tight">
                Security
              </div>
              <div className="w-1.5 h-1.5 left-0 top-[5px] absolute bg-primary-500 rounded-full" />
            </div>
          </div>
          <div className="w-[89px] h-[22px] left-[13px] top-0 absolute justify-start items-center gap-3 inline-flex">
            <div className="w-[22px] h-[22px] relative">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.833984 3.88856C0.833984 3.07818 1.15591 2.30099 1.72894 1.72796C2.30196 1.15493 3.07916 0.833008 3.88954 0.833008H16.1118C16.9221 0.833008 17.6993 1.15493 18.2724 1.72796C18.8454 2.30099 19.1673 3.07818 19.1673 3.88856V16.1108C19.1673 16.9212 18.8454 17.6984 18.2724 18.2714C17.6993 18.8444 16.9221 19.1663 16.1118 19.1663H3.88954C3.07916 19.1663 2.30196 18.8444 1.72894 18.2714C1.15591 17.6984 0.833984 16.9212 0.833984 16.1108V3.88856ZM3.88954 2.87004C3.61941 2.87004 3.36035 2.97735 3.16934 3.16836C2.97833 3.35937 2.87102 3.61844 2.87102 3.88856V16.1108C2.87102 16.3809 2.97833 16.64 3.16934 16.831C3.36035 17.022 3.61941 17.1293 3.88954 17.1293H16.1118C16.3819 17.1293 16.641 17.022 16.832 16.831C17.023 16.64 17.1303 16.3809 17.1303 16.1108V3.88856C17.1303 3.61844 17.023 3.35937 16.832 3.16836C16.641 2.97735 16.3819 2.87004 16.1118 2.87004H3.88954ZM10.0007 4.90708C10.2708 4.90708 10.5298 5.01439 10.7209 5.2054C10.9119 5.39641 11.0192 5.65547 11.0192 5.9256V14.0737C11.0192 14.3439 10.9119 14.6029 10.7209 14.794C10.5298 14.985 10.2708 15.0923 10.0007 15.0923C9.73052 15.0923 9.47146 14.985 9.28045 14.794C9.08944 14.6029 8.98213 14.3439 8.98213 14.0737V5.9256C8.98213 5.65547 9.08944 5.39641 9.28045 5.2054C9.47146 5.01439 9.73052 4.90708 10.0007 4.90708ZM5.92658 7.96264C6.19671 7.96264 6.45577 8.06995 6.64678 8.26096C6.83779 8.45196 6.9451 8.71103 6.9451 8.98116V14.0737C6.9451 14.3439 6.83779 14.6029 6.64678 14.794C6.45577 14.985 6.19671 15.0923 5.92658 15.0923C5.65645 15.0923 5.39739 14.985 5.20638 14.794C5.01537 14.6029 4.90806 14.3439 4.90806 14.0737V8.98116C4.90806 8.71103 5.01537 8.45196 5.20638 8.26096C5.39739 8.06995 5.65645 7.96264 5.92658 7.96264ZM14.0747 11.0182C14.3449 11.0182 14.6039 11.1255 14.7949 11.3165C14.9859 11.5075 15.0932 11.7666 15.0932 12.0367V14.0737C15.0932 14.3439 14.9859 14.6029 14.7949 14.794C14.6039 14.985 14.3449 15.0923 14.0747 15.0923C13.8046 15.0923 13.5455 14.985 13.3545 14.794C13.1635 14.6029 13.0562 14.3439 13.0562 14.0737V12.0367C13.0562 11.7666 13.1635 11.5075 13.3545 11.3165C13.5455 11.1255 13.8046 11.0182 14.0747 11.0182Z"
                  fill="#96A0B5"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Analytic
            </div>
          </div>
          <div className="w-[186px] h-[22px] left-[13px] top-[56px] absolute">
            <div className="w-[120px] h-[22px] left-0 top-0 absolute justify-start items-center gap-3 inline-flex">
              <div className="w-[22px] h-[22px] relative">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_14_3847)">
                    <path
                      d="M11.0007 20.1663C16.0633 20.1663 20.1673 16.0623 20.1673 10.9997C20.1673 5.93706 16.0633 1.83301 11.0007 1.83301C5.93804 1.83301 1.83398 5.93706 1.83398 10.9997C1.83398 16.0623 5.93804 20.1663 11.0007 20.1663Z"
                      stroke="#96A0B5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M1.83398 11H20.1673"
                      stroke="#96A0B5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M11.0007 1.83301C13.2935 4.34316 14.5965 7.60071 14.6673 10.9997C14.5965 14.3986 13.2935 17.6562 11.0007 20.1663C8.70781 17.6562 7.40479 14.3986 7.33398 10.9997C7.40479 7.60071 8.70781 4.34316 11.0007 1.83301V1.83301Z"
                      stroke="#96A0B5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14_3847">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
                Social Media
              </div>
            </div>
            <div className="w-[22px] h-[22px] left-[164px] top-0 absolute">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 8.25L11 13.75L16.5 8.25"
                  stroke="#292C38"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="w-[140px] h-[22px] left-[13px] top-[112px] absolute justify-start items-center gap-3 inline-flex">
            <div className="w-[22px] h-[22px] relative">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M20.1673 11H14.6673L12.834 13.75H9.16732L7.33398 11H1.83398"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.99648 4.68449L1.83398 11.0003V16.5003C1.83398 16.9866 2.02714 17.4529 2.37096 17.7967C2.71477 18.1405 3.18109 18.3337 3.66732 18.3337H18.334C18.8202 18.3337 19.2865 18.1405 19.6303 17.7967C19.9742 17.4529 20.1673 16.9866 20.1673 16.5003V11.0003L17.0048 4.68449C16.853 4.37905 16.6191 4.122 16.3292 3.94225C16.0393 3.7625 15.7051 3.66717 15.364 3.66699H6.63732C6.29624 3.66717 5.96198 3.7625 5.67211 3.94225C5.38224 4.122 5.14826 4.37905 4.99648 4.68449V4.68449Z"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Message Ticket
            </div>
          </div>
          <div className="w-[97px] h-[22px] left-[13px] top-[168px] absolute justify-start items-center gap-3 inline-flex">
            <div className="w-[22px] h-[22px] relative">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M17.4167 3.66699H4.58333C3.57081 3.66699 2.75 4.4878 2.75 5.50033V18.3337C2.75 19.3462 3.57081 20.167 4.58333 20.167H17.4167C18.4292 20.167 19.25 19.3462 19.25 18.3337V5.50033C19.25 4.4878 18.4292 3.66699 17.4167 3.66699Z"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M14.666 1.83301V5.49967"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M7.33398 1.83301V5.49967"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M2.75 9.16699H19.25"
                  stroke="#96A0B5"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
              Schedule
            </div>
          </div>
          <div className="w-[186px] h-[22px] left-[13px] top-[224px] absolute">
            <div className="w-[83px] h-[22px] left-0 top-0 absolute justify-start items-center gap-3 inline-flex">
              <div className="w-[22px] h-[22px] relative">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clip-path="url(#clip0_14_3870)">
                    <path
                      d="M11 13.75C12.5188 13.75 13.75 12.5188 13.75 11C13.75 9.48122 12.5188 8.25 11 8.25C9.48122 8.25 8.25 9.48122 8.25 11C8.25 12.5188 9.48122 13.75 11 13.75Z"
                      stroke="#347AE2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M17.7827 13.7503C17.6607 14.0268 17.6243 14.3335 17.6782 14.6309C17.7321 14.9282 17.8739 15.2026 18.0852 15.4187L18.1402 15.4737C18.3106 15.6439 18.4459 15.8461 18.5381 16.0687C18.6304 16.2912 18.6779 16.5298 18.6779 16.7707C18.6779 17.0117 18.6304 17.2502 18.5381 17.4728C18.4459 17.6954 18.3106 17.8976 18.1402 18.0678C17.9699 18.2383 17.7677 18.3735 17.5452 18.4658C17.3226 18.558 17.084 18.6055 16.8431 18.6055C16.6022 18.6055 16.3636 18.558 16.141 18.4658C15.9185 18.3735 15.7163 18.2383 15.546 18.0678L15.491 18.0128C15.275 17.8015 15.0006 17.6597 14.7032 17.6058C14.4059 17.5519 14.0992 17.5883 13.8227 17.7103C13.5516 17.8265 13.3203 18.0195 13.1575 18.2654C12.9946 18.5113 12.9072 18.7995 12.906 19.0945V19.2503C12.906 19.7366 12.7129 20.2029 12.369 20.5467C12.0252 20.8905 11.5589 21.0837 11.0727 21.0837C10.5865 21.0837 10.1201 20.8905 9.77632 20.5467C9.4325 20.2029 9.23935 19.7366 9.23935 19.2503V19.1678C9.23225 18.8644 9.13404 18.5702 8.95748 18.3233C8.78093 18.0764 8.53419 17.8884 8.24935 17.7837C7.97287 17.6616 7.66617 17.6252 7.36881 17.6792C7.07145 17.7331 6.79705 17.8748 6.58102 18.0862L6.52602 18.1412C6.35575 18.3116 6.15355 18.4468 5.93099 18.5391C5.70843 18.6314 5.46986 18.6789 5.22893 18.6789C4.988 18.6789 4.74944 18.6314 4.52687 18.5391C4.30431 18.4468 4.10212 18.3116 3.93185 18.1412C3.76139 17.9709 3.62617 17.7687 3.53391 17.5461C3.44164 17.3236 3.39416 17.085 3.39416 16.8441C3.39416 16.6031 3.44164 16.3646 3.53391 16.142C3.62617 15.9195 3.76139 15.7173 3.93185 15.547L3.98685 15.492C4.19817 15.276 4.33994 15.0016 4.39385 14.7042C4.44777 14.4068 4.41137 14.1001 4.28935 13.8237C4.17315 13.5525 3.98021 13.3213 3.73428 13.1584C3.48834 12.9956 3.20015 12.9082 2.90518 12.907H2.74935C2.26312 12.907 1.7968 12.7138 1.45299 12.37C1.10917 12.0262 0.916016 11.5599 0.916016 11.0737C0.916016 10.5874 1.10917 10.1211 1.45299 9.7773C1.7968 9.43348 2.26312 9.24033 2.74935 9.24033H2.83185C3.13526 9.23323 3.42952 9.13502 3.67637 8.95846C3.92323 8.7819 4.11125 8.53517 4.21602 8.25033C4.33804 7.97384 4.37444 7.66715 4.32052 7.36979C4.2666 7.07242 4.12484 6.79803 3.91352 6.58199L3.85852 6.52699C3.68806 6.35672 3.55283 6.15453 3.46057 5.93197C3.36831 5.7094 3.32082 5.47084 3.32082 5.22991C3.32082 4.98898 3.36831 4.75041 3.46057 4.52785C3.55283 4.30529 3.68806 4.10309 3.85852 3.93283C4.02878 3.76237 4.23098 3.62714 4.45354 3.53488C4.6761 3.44262 4.91467 3.39513 5.1556 3.39513C5.39653 3.39513 5.63509 3.44262 5.85766 3.53488C6.08022 3.62714 6.28241 3.76237 6.45268 3.93283L6.50768 3.98783C6.72372 4.19915 6.99811 4.34091 7.29548 4.39483C7.59284 4.44875 7.89953 4.41235 8.17602 4.29033H8.24935C8.52047 4.17413 8.7517 3.98118 8.91457 3.73525C9.07744 3.48932 9.16484 3.20113 9.16602 2.90616V2.75033C9.16602 2.2641 9.35917 1.79778 9.70299 1.45396C10.0468 1.11015 10.5131 0.916992 10.9993 0.916992C11.4856 0.916992 11.9519 1.11015 12.2957 1.45396C12.6395 1.79778 12.8327 2.2641 12.8327 2.75033V2.83283C12.8339 3.1278 12.9213 3.41599 13.0841 3.66192C13.247 3.90785 13.4782 4.10079 13.7493 4.21699C14.0258 4.33901 14.3325 4.37541 14.6299 4.3215C14.9273 4.26758 15.2016 4.12582 15.4177 3.91449L15.4727 3.85949C15.6429 3.68904 15.8451 3.55381 16.0677 3.46155C16.2903 3.36929 16.5288 3.3218 16.7698 3.3218C17.0107 3.3218 17.2493 3.36929 17.4718 3.46155C17.6944 3.55381 17.8966 3.68904 18.0668 3.85949C18.2373 4.02976 18.3725 4.23196 18.4648 4.45452C18.5571 4.67708 18.6045 4.91565 18.6045 5.15658C18.6045 5.3975 18.5571 5.63607 18.4648 5.85863C18.3725 6.0812 18.2373 6.28339 18.0668 6.45366L18.0118 6.50866C17.8005 6.7247 17.6588 6.99909 17.6048 7.29645C17.5509 7.59381 17.5873 7.90051 17.7093 8.17699V8.25033C17.8255 8.52145 18.0185 8.75267 18.2644 8.91554C18.5104 9.07841 18.7985 9.16582 19.0935 9.16699H19.2493C19.7356 9.16699 20.2019 9.36015 20.5457 9.70396C20.8895 10.0478 21.0827 10.5141 21.0827 11.0003C21.0827 11.4866 20.8895 11.9529 20.5457 12.2967C20.2019 12.6405 19.7356 12.8337 19.2493 12.8337H19.1668C18.8719 12.8348 18.5837 12.9222 18.3378 13.0851C18.0918 13.248 17.8989 13.4792 17.7827 13.7503V13.7503Z"
                      stroke="#347AE2"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_14_3870">
                      <rect width="22" height="22" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="text-gray-800 text-sm font-medium font-['Inter'] leading-tight">
                Setting
              </div>
            </div>
            <div className="w-[22px] h-[22px] left-[164px] top-0 absolute">
              <svg
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 8.25L11 13.75L16.5 8.25"
                  stroke="#292C38"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="left-[33px] top-[963px] absolute justify-start items-center gap-3 inline-flex cursor-pointer"
          onClick={() => {
            switch (id) {
              case APIName.Loi:
                HandleLogoutLoi(user.token.accessToken);
                break;
              case APIName.Bach:
                HandleLogout();
                break;
              case APIName.Ha:
                HandleLogout();
                break;
              case APIName.NhuY:
                HandleLogoutNhuY(user.token.accessToken);
                break;
            }
          }}
        >
          <div className="w-[22px] h-[22px] relative">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8.25 19.25H4.58333C4.0971 19.25 3.63079 19.0568 3.28697 18.713C2.94315 18.3692 2.75 17.9029 2.75 17.4167V4.58333C2.75 4.0971 2.94315 3.63079 3.28697 3.28697C3.63079 2.94315 4.0971 2.75 4.58333 2.75H8.25"
                stroke="#96A0B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.666 15.5837L19.2493 11.0003L14.666 6.41699"
                stroke="#96A0B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19.25 11H8.25"
                stroke="#96A0B5"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
            Log Out
          </div>
        </div>
      </div>
      <div className="w-[1128px] h-[880px] left-[280px] top-[112px] absolute">
        <div className="w-[652px] h-[880px] left-0 top-0 absolute">
          <div className="w-[652px] h-[880px] left-0 top-0 absolute bg-white rounded-xl shadow border" />
          <div className="left-[56px] top-[160px] absolute text-gray-900 text-2xl font-bold font-['Inter'] leading-9">
            Change Password
          </div>
          <div className="w-[540px] left-[56px] top-[220px] absolute text-gray-500 text-sm font-medium font-['Inter'] leading-tight">
            To change your password, please fill in the fields below.
            <br />
            Your password must contain at least 8 characters, it must also
            include at least one upper case letter, one lower case letter, one
            number and one special character.
          </div>
          <ChangePassword user={user} handllogout={HandleLogout}/>

          <div className="w-20 h-20 left-[56px] top-[56px] absolute bg-gray-50 rounded-full" />
          <div className="w-8 h-8 left-[80px] top-[80px] absolute">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 14.667H6.66667C5.19391 14.667 4 15.8609 4 17.3337V26.667C4 28.1398 5.19391 29.3337 6.66667 29.3337H25.3333C26.8061 29.3337 28 28.1398 28 26.667V17.3337C28 15.8609 26.8061 14.667 25.3333 14.667Z"
                stroke="#347AE2"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33398 14.667V9.33366C9.33398 7.56555 10.0364 5.86986 11.2866 4.61961C12.5368 3.36937 14.2325 2.66699 16.0007 2.66699C17.7688 2.66699 19.4645 3.36937 20.7147 4.61961C21.9649 5.86986 22.6673 7.56555 22.6673 9.33366V14.667"
                stroke="#347AE2"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
        </div>
        <div className="w-[444px] h-[880px] left-[684px] top-0 absolute bg-white rounded-xl shadow border">
          <div className="w-20 h-20 left-[56px] top-[56px] absolute bg-gray-50 rounded-full" />
          <div className="w-8 h-8 left-[80px] top-[80px] absolute">
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 14.667H6.66667C5.19391 14.667 4 15.8609 4 17.3337V26.667C4 28.1398 5.19391 29.3337 6.66667 29.3337H25.3333C26.8061 29.3337 28 28.1398 28 26.667V17.3337C28 15.8609 26.8061 14.667 25.3333 14.667Z"
                stroke="#347AE2"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9.33398 14.667V9.33366C9.33398 7.56555 10.0364 5.86986 11.2866 4.61961C12.5368 3.36937 14.2325 2.66699 16.0007 2.66699C17.7688 2.66699 19.4645 3.36937 20.7147 4.61961C21.9649 5.86986 22.6673 7.56555 22.6673 9.33366V14.667"
                stroke="#347AE2"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="mt-40 px-10 flex flex-col gap-3">
            <div className="text-gray-900 text-2xl font-bold font-['Inter'] leading-9">
              User Information
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                User ID
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.id}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                Username
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.username}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                FullName
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.fullname}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                Email
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.email}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                Address
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.address}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                Gender
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.gender}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                Role
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.role}
              </div>
            </div>
            <div>
              <div className="text-gray-900 text-lg font-medium font-['Inter']">
                DOB
              </div>
              <div className="h-10 bg-white rounded-xl border border-gray-100 flex items-center px-3">
                {user.userInfo.DOB}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CutstomHome;
